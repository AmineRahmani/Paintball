import React, { useState } from 'react';
import '../Style/Footer.scss';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert('Veuillez entrer une adresse e-mail .');
      return;
    }
    // Ici, vous pouvez ajouter la logique pour envoyer l'adresse e-mail à votre service de gestion de newsletter
    alert(`Adresse e-mail soumise avec succès : ${email}`);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    // Utilisation d'une expression régulière simple pour valider l'e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer className="site-footer">
      <div className="row">
        <div className="col-md-4">
          <div className="widget">
            <h3 className="widget-title">Contact</h3>
            <address>
              <strong>Universal Paintball</strong>
              <p>Avenu Abu El Kacem Chebbi</p>
              <a href="mailto:info@companyname.com">Paintballuniversal@gmail.com</a>
              <br/><a href="#">54273714 / 22851455</a>
            </address>
          </div>
        </div>
        <div className="col-md-4">
          <div className="widget">
            <h3 className="widget-title">Information</h3>
            <ul className="no-bullet">
              <li><a href="#"> Notre société propose des jeux stratégiques en plein air</a></li>
              
              <li><a href="#">Les participants vivent une expérience d'adrénaline intense.</a></li>
              
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="widget">
            <h3 className="widget-title">Newsletter</h3>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input type="text" name="email" placeholder="Entrez votre adresse e-mail.." value={email} onChange={handleEmailChange} />
              <input type="submit" value="Rejoindre" />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
      
      <div className="colophon">
        <br/>
        <b><h2>Suivez-nous :</h2></b>
        <p> <small>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          </small></p>
      </div>
    </footer>
  );
};

export default Footer;