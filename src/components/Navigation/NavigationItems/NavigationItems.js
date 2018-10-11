import React from 'react';
import './navigation_items.scss';
import {NavLink} from 'react-router-dom';

const navigationItems = (props) => (
  <nav>
    <ul className={`navigation-items ${props.show ? "active" : null}`}>
      <li className="navigation-item" onClick={props.clicked}><NavLink to="/" exact>Burger Builder</NavLink></li>
      {props.isAuth ? <li className="navigation-item" onClick={props.clicked}><NavLink to="/orders">Orders</NavLink></li> : null}
      {!props.isAuth 
        ? <li className="navigation-item" onClick={props.clicked}><NavLink to="/auth">Authenticate</NavLink></li>
        : <li className="navigation-item" onClick={props.clicked}><NavLink to="/logout">Logout</NavLink></li>
      }
    </ul>
  </nav>
);

export default navigationItems;