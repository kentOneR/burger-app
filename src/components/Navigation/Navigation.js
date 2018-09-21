import React from 'react';
import Logo from 'Components/Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import Backdrop from 'Components/UI/Backdrop/Backdrop';
import BurgerMenu from './BurgerMenu/BurgerMenu'
import './navigation.scss';

const navigation = (props) => (
  <header className="navigation">
    <BurgerMenu clicked={props.toggleNav} />
    <Logo />
    <NavigationItems
      show={props.showNav} />
    <Backdrop
      clicked={props.closeNav} 
      show={props.showNav}/>
  </header>
);

export default navigation;