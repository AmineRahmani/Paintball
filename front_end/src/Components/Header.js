import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/Header.scss';

const Header = () => {
  return (
    <header className="site-header">
      <a href="/" id="branding" className="pull-left">
        <img src="images/logo.png" alt="" className="logo"/>
        <div className="logo-text">
          <p><b>Universal<br></br> paintball</b></p>
        </div>
      </a>
      <div className="main-navigation">
        <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
        <ul className="menu">
          <li className="menu-item">
            <NavLink exact to="/" activeClassName="active">Acceuil</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/about" activeClassName="active">A propos</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/offer" activeClassName="active">Equipements</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/gallery" activeClassName="active">Porfolio</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="mobile-navigation"></div>
    </header>
  );
};

export default Header;