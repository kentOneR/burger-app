import React from 'react';
import './navigation_items.scss';

const navigationItems = (props) => (
  <nav>
    <ul className={`navigation-items ${props.show ? "active" : null}`}>
      <li className="navigation-item"><a className="active" href="/">Burger Builder</a></li>
      <li className="navigation-item"><a href="/">Checkout</a></li>
    </ul>
  </nav>
);

export default navigationItems;