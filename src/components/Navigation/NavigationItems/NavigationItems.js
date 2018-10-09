import React from 'react';
import './navigation_items.scss';
import {NavLink} from 'react-router-dom';

const navigationItems = (props) => (
  <nav>
    <ul className={`navigation-items ${props.show ? "active" : null}`}>
      <li className="navigation-item"><NavLink to="/" exact>Burger Builder</NavLink></li>
      <li className="navigation-item"><NavLink to="/orders">Orders</NavLink></li>
      <li className="navigation-item"><NavLink to="/auth">Authenticate</NavLink></li>
    </ul>
  </nav>
);

export default navigationItems;