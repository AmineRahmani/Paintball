import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import '../Style/Acceuil.scss';
import Button from 'react-bootstrap/Button';
import Calendar from './Calender';
import Carousel from './Carousel';
import MapComponent from './Map';
import Chat from './Chat';
import News from './News';

export default class Acceuil extends Component {
    state = {
        expandedIndex: -1
    };

    handleToggle = (index) => {
        this.setState({ expandedIndex: this.state.expandedIndex === index ? -1 : index });
    };

    render() {
        const { expandedIndex } = this.state;
        return (
            <div id="site-content">
                <div className="container">
                    <Header />
                    <Carousel />
                    
                     <Chat/>
                    <main className="main-content">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="feature">
                                    <figure className="feature-image"><img src="dummy/feature-image-1.jpg" alt="" /></figure>
                                    <h2 className="feature-title">À propos de nous</h2>
                                    <p>
                                        Nous sommes passionnés par le paintball et dédiés à offrir des expériences inoubliables à nos membres.
                                        {expandedIndex === 0 && <span> Notre mission est de promouvoir le sport et de créer une communauté accueillante où les joueurs de tous niveaux peuvent se rencontrer, s'entraîner et s'amuser. Rejoignez-nous pour découvrir un monde d'excitation et de camaraderie.</span>}
                                        <button onClick={() => this.handleToggle(0)} className="read-more-button">
                                            {expandedIndex === 0 ? 'Lire moins' : 'Lire la suite'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature">
                                    <figure className="feature-image"><img src="dummy/feature-image-2.jpg" alt="" /></figure>
                                    <h2 className="feature-title">Notre Club</h2>
                                    <p>
                                        Notre club de paintball est un lieu de rencontre pour les amateurs et les passionnés de tous âges.
                                        {expandedIndex === 1 && <span> Avec des installations modernes, des terrains variés et un personnel qualifié, nous offrons un environnement sécurisé et amusant pour tous. Que vous soyez un débutant ou un joueur expérimenté, notre club est l'endroit idéal pour améliorer vos compétences et profiter du jeu.</span>}
                                        <button onClick={() => this.handleToggle(1)} className="read-more-button">
                                            {expandedIndex === 1 ? 'Lire moins' : 'Lire la suite'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature">
                                    <figure className="feature-image"><img src="dummy/feature-image-3.jpg" alt="" /></figure>
                                    <h2 className="feature-title">Entraînements</h2>
                                    <p>
                                        Nos sessions d'entraînement sont conçues pour aider les joueurs à développer leurs compétences et leur stratégie sur le terrain.
                                        {expandedIndex === 2 && <span> Encadrés par des instructeurs expérimentés, nos entraînements couvrent tous les aspects du paintball, de la précision du tir à la coordination en équipe. Participez à nos entraînements pour devenir un joueur plus performant et confiant.</span>}
                                        <button onClick={() => this.handleToggle(2)} className="read-more-button">
                                            {expandedIndex === 2 ? 'Lire moins' : 'Lire la suite'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="cta-container">
                            <div className="cta-section" data-bg-image="dummy/section-bg.jpg">
                                <h2 className="cta-title">Faire partie de l'équipe</h2>
                                <p>Venez tester votre esprit d'équipe et vos compétences stratégiques sur notre terrain de paintball exceptionnel. Ne manquez pas cette aventure excitante, inscrivez-vous dès aujourd'hui !</p>
                                <Link to="/recherche">
                                    <Button className="extraordinary-button" variant="primary">Réservez-Maintenant</Button>
                                </Link>
                            </div>
                            <div className="cta-section" data-bg-image="dummy/section-bg.jpg">
                                <h2 className="cta-title">Évaluation de votre expérience</h2>
                                <p>Votre opinion est précieuse ! Aidez-nous à nous améliorer en partageant votre expérience après votre session de paintball. Cliquez sur "Évaluez" ci-dessous pour nous faire part de vos commentaires. Merci pour votre contribution !</p>
                                <Link to="/evaluer"><Button className="extraordinary-button">Évaluez</Button></Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <h4 className="section-title"><News/></h4>
                            </div>
                            <div className="col-md-5 calendar-container">
                                <Calendar />
                            </div>
                        </div>
                        <MapComponent />
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
}
