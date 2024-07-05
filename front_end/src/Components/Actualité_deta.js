import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Actualité_deta = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  

  useEffect(() => {
    axios.get(`http://localhost:8000/actualite/${id}/`)  
      .then(response => {
        setNews(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!news) {
    return <div>Aucune actualité trouvée.</div>;
  }

  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.content}</p>
    </div>
  );
};

export default Actualité_deta;
