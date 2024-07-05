import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../Style/About.css'; 
import Chat from './Chat';
export default class About extends Component {
  render() {
    return (
      <div id="about-site-content">
        <div className="about-container">
          <Header />
          <Chat/>
          <main className="about-main-content">
            <h2 className="about-section-title">
              La communication entre les membres de l'équipe est essentielle pour remporter une partie de paintball.
            </h2>

            <div className="about-row">
              <div className="about-col-md-3">
                <figure className="flip-card">
                  <img className="flip-card-img" src="dummy/thumbnail-1.jpg" alt="" />
                  <div className="flip-card-overlay">
                    <p>Dans le paintball, chaque mouvement et chaque décision comptent.</p>
                  </div>
                </figure>
              </div>
              <div className="about-col-md-3">
                <figure className="flip-card">
                  <img className="flip-card-img" src="dummy/thumbnail-2.jpg" alt="" />
                  <div className="flip-card-overlay">
                    <p>Le paintball est non seulement amusant, mais il permet aussi de développer des compétences en leadership et en travail d'équipe.</p>
                  </div>
                </figure>
              </div>
              <div className="about-col-md-3">
                <figure className="flip-card">
                  <img className="flip-card-img" src="dummy/thumbnail-3.jpg" alt="" />
                  <div className="flip-card-overlay">
                    <p>Le but du paintball est de marquer les joueurs adverses avec des billes de peinture sans se faire toucher.</p>
                  </div>
                </figure>
              </div>
              <div className="about-col-md-3">
                <figure className="flip-card">
                  <img className="flip-card-img" src="dummy/thumbnail-4.jpg" alt="" />
                  <div className="flip-card-overlay">
                    <p>Participer à des tournois de paintball peut offrir une expérience compétitive et excitante.</p>
                  </div>
                </figure>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}