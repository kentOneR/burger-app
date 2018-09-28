import React from 'react';
import './button.scss';

const button = (props) => (
  <button 
    className={`button ${props.btnType}`} 
    onClick={props.clicked}
    disabled={props.disabled}>{props.children}</button>
);

export default button;