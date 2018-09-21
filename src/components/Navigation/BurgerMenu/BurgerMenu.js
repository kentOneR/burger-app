import React from 'react';
import './burger_menu.scss';

const burgerMenu = (props) => (   
  <div className="burger-menu" onClick={props.clicked}>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default burgerMenu;