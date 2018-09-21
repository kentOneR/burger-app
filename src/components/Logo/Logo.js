import React from 'react';
import burgerLogo from 'Assets/images/burger-logo.png';
import './logo.scss';

const logo = () => (
  <div className="logo">
    <img src={burgerLogo} alt="My Burger"/>
  </div>
);

export default logo;