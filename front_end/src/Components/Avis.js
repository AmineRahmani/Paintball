import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Avis = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/reviews/') 
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const getStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} style={{color:'#ffd700'}}>&#9733;</span>); // étoile pleine
            } else {
                stars.push(<span key={i}>&#9734;</span>); // étoile vide
            }
        }
        return stars;
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    return (
        <div>
            <Header/>
            <h2>Avis des clients</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <h3>Utilisateur: {review.user}</h3>
                        <div>
                            Note: {getStars(review.rating)} {review.rating}/5
                        </div>
                        <p>Commentaire: {review.comment}</p>
                    </li>
                ))}
            </ul>
            <Link to="/evaluer">Évaluer maintenant</Link>
            <Footer/>
        </div>
    );
};

export default Avis;
