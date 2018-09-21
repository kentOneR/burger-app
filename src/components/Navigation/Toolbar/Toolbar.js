import React from 'react';
import Logo from 'Components/Logo/Logo';
import NavigationItems from 'Components/Navigation/NavigationItems/NavigationItems';
import './toolbar.scss';

const toolbar = (props) => (
  <header className="toolbar">
    <div>MENU</div>
    <Logo />
    <NavigationItems />
  </header>
);

export default toolbar;