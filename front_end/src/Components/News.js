import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/rating.scss'
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/actualite/')  
      .then(response => {
        setNews(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <div className="news-container">
    <h2 className="news-title"><u>Restez branché avec les derniers actualités!</u></h2>
    <ul className="news-list">
      {news.map(item => (
        <li key={item.id} className="news-item">
          <span className="date">{item.date}</span> : 
            <Link to={`/news/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default News;
