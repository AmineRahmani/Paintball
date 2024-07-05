import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {login}from '../Features/user.js';
import Header from './Header';
import Footer from './Footer';
import '../Style/reservation.scss'
import Chat from './Chat';

const Reservation = () => {
  const { terrainId } = useParams();
  const [autreformData, setAutreFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    numberOfBalls: 0,
    phone: ''
  });
 // const [reservationSuccess, setReservationSuccess] = useState(false);
 // const [showPaymentButton, setShowPaymentButton] = useState(false);
  //const [reservationId, setReservationId] = useState(null);
 // const [clientId,setClientId] = useState(null);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));   //stocker les données coté client et les convertir sous forme json
    if (savedFormData) {
     dispatch(login(savedFormData));     //Pour envoyer une action au store redux
    }
  }, [dispatch]);

  const state = useSelector((state) => state.user.value); //Pour acceder au donner du store

  const handleChange = (e) => {
    setAutreFormData({ ...autreformData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!autreformData.name || !autreformData.lastname || !autreformData.email || !autreformData.numberOfBalls || !autreformData.phone) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    const numberOfBalls = parseInt(autreformData.numberOfBalls);
    if (isNaN(numberOfBalls) || numberOfBalls <= 0) {
      alert('Le nombre de boules doit être un entier positif.');
      return;
    }

    const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if (!namePattern.test(autreformData.name)) {
      alert('Le nom ne doit contenir que des lettres et un espace au maximum pour les noms composés.');
      return;
    }
    if (!namePattern.test(autreformData.lastname)) {
      alert('Le prénom ne doit contenir que des lettres et un espace au maximum pour les prénoms composés.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(autreformData.email)) {
      alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    const phonePattern = /^\d{8}$/;
    if (!phonePattern.test(autreformData.phone)) {
      alert('Le téléphone doit contenir exactement 8 chiffres.');
      return;
    }

    try {
      const formDataToSend = {
        ...autreformData,
        terrainId: terrainId,
        numberOfPlayers: state.numberOfPlayers,
        reservationDate: state.reservationDate,
        startTime: state.startTime,
        endTime: state.endTime
      };
       await axios.post('http://localhost:8000/viewset/reservation/', formDataToSend);
      //const { reservation_id ,client_id} = response.data;
      //setReservationId(reservation_id);
      //setClientId(client_id);
      //setReservationSuccess(true);
      //setShowPaymentButton(true);
      
      //const amountToPay = state.numberOfPlayers * autreformData.numberOfBalls;
      //const payonline = amountToPay * 0.1;
      //const paysurplace = amountToPay - payonline;
      //const message = `Félicitations ${autreformData.name} ${autreformData.lastname} ! Vous avez réservé le terrain ${terrainId} le ${state.reservationDate} de ${state.startTime} à ${state.endTime} avec succès ! Le montant à payer est ${amountToPay} dinars. Vous êtes invité à payer ${payonline} en ligne maintenant et ${paysurplace} sur place.`;
      const message = 'Consulter votre email';

      alert(message);
      
    } catch (error) {
      console.error('Erreur lors de la création de la réservation :', error);
      alert('Une erreur est survenue lors de la création de la réservation. Veuillez réessayer.');
    }
  };

  //const handlePayment = () => {
    //const amountToPay = state.numberOfPlayers * autreformData.numberOfBalls;
    //dispatch(setAmountToPay(amountToPay));
   // navigate(`/payment?reservation_id=${reservationId}&client_id=${clientId}`);
  //};

  return (
    <div className="reservation-container">
      <Header />
      <Chat/>
      <h2 className="reservation-title">Réservation pour le terrain {terrainId}</h2>
      <div className="form-container"> {/* Nouvelle div pour envelopper les champs du formulaire */}
        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Nombre de joueurs :
              <input
                type="number"
                value={state.numberOfPlayers}
                readOnly
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Date :
              <input
                type="date"
                value={state.reservationDate}
                readOnly
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Heure de début :
              <input
                type="time"
                value={state.startTime}
                readOnly
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Heure de fin :
              <input
                type="time"
                value={state.endTime}
                readOnly
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Nom :
              <input
                type="text"
                name="name"
                value={autreformData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Prénom :
              <input
                type="text"
                name="lastname"
                value={autreformData.lastname}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email :
              <input
                type="email"
                name="email"
                value={autreformData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Nombre de boules par joueur :
              <input
                type="number"
                name="numberOfBalls"
                value={autreformData.numberOfBalls}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Téléphone :
              <input
                type="tel"
                name="phone"
                value={autreformData.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button className="reservation-button1">Confirmer la réservation</button>
          
        </form>
      </div>
      
      <Footer />
    </div>
  );
  

  

 
};

export default Reservation;