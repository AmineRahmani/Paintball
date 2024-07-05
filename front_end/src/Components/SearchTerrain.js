import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Features/user';
import Header from './Header';
import Footer from './Footer';
import '../Style/searchterrain.scss';
import Chat from './Chat';


const SearchTerrain = () => {
  const [formData, setFormData] = useState({
    numberOfPlayers: 1,
    reservationDate: '',
    startTime: '',
    endTime: ''
  });

  const [message, setMessage] = useState('');
  const [terrains, setTerrains] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/viewset/terrain/');console.log(response.data);
        setTerrains(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des terrains :', error);
        setMessage('Une erreur s\'est produite lors de la récupération des terrains.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    // Si l'utilisateur modifie l'heure de début, mettez à jour l'heure de fin
    if (name === 'startTime') {
      const [hours, minutes] = value.split(':');
      const startTime = new Date(2000, 0, 1, hours, minutes);
      startTime.setMinutes(startTime.getMinutes() + 90); // Ajoute 90 minutes
      const endTime = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
      setFormData({ ...formData, [name]: value, endTime });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification de la saisie des champs
    if (!formData.numberOfPlayers || !formData.reservationDate || !formData.startTime) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Vérification du nombre de joueurs
    const numberOfPlayers = parseInt(formData.numberOfPlayers);
    if (isNaN(numberOfPlayers) || numberOfPlayers <= 1) {
      setMessage('Le nombre de joueurs doit être un entier strictement positif.');
      return;
    }

    // Vérification de l'heure de début entre 06:00 et 18:00
    const startTimeForm = new Date(`2000-01-01T${formData.startTime}`);
    const endTimeForm = new Date(`2000-01-01T${formData.endTime}`);
    const debutIntervalStart = new Date(`2000-01-01T06:00:00`);
    const debutIntervalEnd = new Date(`2000-01-01T18:00:00`);
    if (startTimeForm < debutIntervalStart || startTimeForm > debutIntervalEnd) {
      setMessage('L\'heure de début doit être entre 06:00 et 18:00.');
      return;
    }

    // Vérification de la date de réservation à partir de la date actuelle
    const currentDate = new Date();
    const reservationDate = new Date(formData.reservationDate);

    // Si la date de réservation est la même que la date actuelle
    if (reservationDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]) {
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      const startTimeForm = new Date(`2000-01-01T${formData.startTime}`);

      // Si l'heure de début est antérieure à l'heure actuelle, afficher un message d'erreur
      if (startTimeForm.getHours() < currentHour || (startTimeForm.getHours() === currentHour && startTimeForm.getMinutes() < currentMinute)) {
        const currentHourStr = currentHour < 10 ? '0' + currentHour : currentHour.toString();
        const currentMinuteStr = currentMinute < 10 ? '0' + currentMinute : currentMinute.toString();
        const errorMessage = `L'heure de début de réservation doit être postérieure à  ${currentHourStr}:${currentMinuteStr}`;
        // Affichage du message d'erreur
        setMessage(errorMessage);
        return;
      }
    }
    try {
      const reservationsResponse = await axios.get('http://localhost:8000/viewset/reservation/');
      const reservations = reservationsResponse.data;

      const conflictingReservations = reservations.filter(reservation => {
        const startTime = new Date(`2000-01-01T${reservation.start_time}`);
        const endTime = new Date(`2000-01-01T${reservation.end_time}`);
        return reservation.date === formData.reservationDate &&
          startTime < endTimeForm &&
          endTime > startTimeForm;
      });

      const availableTerrains = terrains.filter(terrain => {
        const hasConflictingReservation = conflictingReservations.some(reservation => {
          return reservation.terrain === terrain.id;
        });
        return !hasConflictingReservation && terrain.capacity >= formData.numberOfPlayers;
      });

      if (availableTerrains.length > 0) {
        dispatch(login(formData));
        localStorage.setItem('formData', JSON.stringify(formData));
        navigate('/terrains_disponibles', { state: { terrains: availableTerrains} });
        setMessage('');
      } else {
        setMessage('Aucun terrain disponible pour ces critères.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
      setMessage('Une erreur s\'est produite lors de la récupération des réservations.');
    }
  };

  return (
    
    <div className="unique-form-container1">
  
      <Header/>
    
  <h2><b>Recherche de terrain</b></h2>
  <form onSubmit={handleSubmit}>
    <table>
      <tbody>
        <tr>
          <td><label htmlFor="numberOfPlayers"><h3>Nombre de joueurs </h3></label></td>
          <td>
            <input
              type="number"
              name="numberOfPlayers"
              value={formData.numberOfPlayers}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="reservationDate"><h3>Date de réservation </h3></label></td>
          <td>
            <input
              type="date"
              name="reservationDate"
              value={formData.reservationDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="startTime"><h3>Heure de début </h3></label></td>
          <td>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="endTime"><h3>Heure de fin </h3></label></td>
          <td>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              readOnly
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button className="extraordinary-button" >Chercher</button>
  </form>
  {message && <p>{message}</p>}
  <Footer/><Chat/>
  
</div>

  );
};

export default SearchTerrain;