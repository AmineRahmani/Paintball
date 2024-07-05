import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../StarRating';
import Header from './Header';
import Footer from './Footer';
import Chat from './Chat';
import '../Style/Evaluation.scss'; // Créez ce fichier pour les styles personnalisés



const Evaluation = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [clientName, setClientName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientName) {
      alert('Veuillez saisir un pseudoname.');
      return;
    }

    const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if (!namePattern.test(clientName)) {
      alert('Le nom ne doit contenir que des lettres et un espace au maximum pour les noms composés.');
      return;
    }

    if (!comment && rating === 0) {
      alert('Veuillez fournir un commentaire ou choisir une note.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/reviews/', {
        rating: rating,
        comment: comment,
        name: clientName,
      });
      alert('Évaluation soumise avec succès:', response.data);
      setRating(0);
      setComment('');
      setClientName('');
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'évaluation:', error);
    }
  };

  return (
    <div className="evaluation-container">
      
      <Header />
     <Chat/>
      <h2>Saisir une évaluation</h2>
      
      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-block">
          <label>
           <b> Note :</b>
            <StarRating
              count={5}
              value={rating}
              onChange={(value) => setRating(value)}
              size={24}
              color1={'#ffd700'}
              color2={'#000000'}
            />
          </label>
        </div>
        <div className="form-block">
          <div>
            <label>
             <b> Votre Nom  :</b>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <b>Commentaire :</b>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </div>
        </div>
        <button className='evaluation-button1'><b>Soumettre</b></button>
        
        
      </form>
      <div className="center-link">
                    <Link to="/avis"><b><u>Voir la liste des avis </u></b></Link>
                </div>
      <Footer />
    </div>
  );
};

export default Evaluation;