import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import reportWebVitals from './reportWebVitals';
import Acceuil from './Components/Acceuil';
import About from './Components/About';
import Offer from './Components/Offer';
import Gallery from './Components/Gallery';
import SearchTerrain from './Components/SearchTerrain';
import Contact from './Components/Contact';
import TerrainList from './Components/TerrainList';
import Reservation from './Components/Reservation';
import Evaluation from './Components/Evaluation';
import Avis from './Components/Avis';
import Payment from './Components/Payment';

import { Provider } from 'react-redux';
import { store } from './Store';
import Actualité_deta from './Components/Actualité_deta';

const stripePromise = loadStripe('pk_test_51PKyP7JMDxWgw3GVAmBD28eFcOCqjF4YZfBL5PzVd7d6hRvtgsLz99xKBLnYGcb07LtgOhPy97O4cND1Nt20pOlY006ypHntWf');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/about" element={<About />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/recherche" element={<SearchTerrain />} />
            <Route path="/terrains_disponibles" element={<TerrainList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation/:terrainId" element={<Reservation />} />
            <Route path="/evaluer" element={<Evaluation />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/avis" element={<Avis />} />
            <Route path="/news/:id" element={<Actualité_deta />} /> {/* Route dynamique */}
          </Routes>
        </Router>
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
