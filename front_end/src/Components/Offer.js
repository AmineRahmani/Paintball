import {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import '../Style/Offer.scss'
import Chat from './Chat';

export default class Offer extends Component{
    render(){
        return(<div id="site-content">
            <div className="container">
                <Header/>
                <Chat/>
               
    
                    <main className="main-content">
                        
                        <h2 className="section-title"> Les Équipements Essentiels pour une partie Paintball : Sécurité et Performance</h2>
    
                        <p>Les équipements sont variés mais essentiels pour assurer la sécurité et le plaisir des joueurs. Les lanceurs propulsent les billes de peinture, les masques protègent le visage et les yeux, les réservoirs fournissent l'énergie, et les vêtements de protection minimisent les impacts. Accessoires tels que les pods et les gilets tactiques complètent l'équipement pour une expérience de jeu optimale</p>
    
                        <div className="row">
                            <div className="col-md-4">
                                <div className="feature text-center">
                                    <figure className="feature-icon"><img src="images/paintball-illustrations/antiball.svg.png" width={"150px"} alt="#" data-no-retina/></figure>
                                    <p> Une combinaison ou des vêtements de protection spéciaux sont souvent portés pour protéger les joueurs contre les éraflures, les égratignures et les impacts mineurs. Ils peuvent être rembourrés pour offrir un niveau supplémentaire de protection.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature text-center">
                                    <figure className="feature-icon"><img src="images/paintball-illustrations/gons.png" width={"150px"} alt="#" data-no-retina/></figure>
                                    <p>Les gants protègent les mains des joueurs contre les impacts des billes et les frottements contre les obstacles du terrain. Ils offrent également une meilleure adhérence sur le lanceur et les autres équipements.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature text-center">
                                    <figure className="feature-icon"><img src="images/paintball-illustrations/co2.png" width={"150px"} alt="#" data-no-retina/></figure>
                                    <p>Bouteille d'air comprimé : Utilisée pour alimenter le lanceur, elle contient de l'air comprimé à haute pression. Elle offre une propulsion plus constante et fiable des billes de peinture par rapport au CO2.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="feature text-center">
                                    <figure className="feature-icon"><img src="images/paintball-illustrations/casque.png"width={"150px"} alt="#" data-no-retina/></figure>
                                    <p>Un masque est essentiel pour protéger le visage et les yeux des joueurs contre les impacts des billes de peinture. Il est souvent équipé d'un écran transparent pour une vision claire et peut avoir une mousse intérieure pour un confort accru.

</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature text-center">
                                    <figure className="feature-icon"><img src="images/paintball-illustrations/m4a1.png"width={"150px"} alt="#" data-no-retina/></figure>
                                    <p>Le lanceur, ou marqueur, est l'outil principal utilisé pour tirer des billes de peinture. Il propulse les billes à travers un canon en utilisant de l'air comprimé ou du dioxyde de carbone (CO2). Les lanceurs peuvent varier en termes de design, de fonctionnalités et de vitesse de tir.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature text-center">
                                    <figure className="feature-icon"><img src="images/paintball-illustrations/gilet.png"width={"150px"} alt="#" data-no-retina/></figure>
                                    <p>  Un gilet offre une protection supplémentaire contre les impacts des billes de peinture, en particulier sur le torse et le dos. Certains gilets sont équipés de poches pour transporter des accessoires supplémentaires comme des cartouches de CO2 ou des tubes de billes de rechange.</p>
                                </div>
                            </div>


                            
                        </div>
    
                        <section className="cta">
                            <h2 className="cta-title">Question ? Appelez-nous<a href="#">(+216) 22851455 / 54273714</a></h2>
                        </section>
    
                    </main> 
                <Footer/>
            </div></div>
                    )
            
    }
}

