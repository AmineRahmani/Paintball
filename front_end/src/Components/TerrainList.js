import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../Style/searchterrain.scss';
import Chat from './Chat';

const TerrainList = () => {
  const location = useLocation();
  const terrains = location.state && location.state.terrains;
  const navigate = useNavigate();

  const handleReservation = (terrainId) => {
    navigate(`/reservation/${terrainId}`);
  };

  return (
    <div>
    <Header />
    <Chat />
    <h1 style={{ textAlign: 'center' }}>Liste des terrains adéquats</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {terrains && terrains.map((terrain) => (
        <div key={terrain.id} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '80%' }}>
          <h2 style={{ textAlign: 'center' }}>{terrain.name}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, textAlign: 'left', padding: '10px' }}>
              <p style={{ marginBottom: '10px' }}><strong>Capacité :</strong> {terrain.capacity}</p>
              <p style={{ marginBottom: '10px' }}><strong>Description :</strong> {terrain.description}</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '10px' }}>
              {terrain.images && terrain.images.map((image, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <img
                    src={image.image}
                    alt={`Terrain ${terrain.name} ${index + 1}`}
                    style={{ width: '250px', height: 'auto', borderRadius: '4px', marginBottom: '5px' }}
                  />
                  <p style={{ textAlign: 'center', fontSize: '14px' }}>{image.description}</p>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, textAlign: 'right', padding: '10px' }}>
              <button
                className="extraordinary-button"
                onClick={() => handleReservation(terrain.id)}
                style={{ backgroundColor: 'orange', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', cursor: 'pointer' }}
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
  
  );
};

export default TerrainList;