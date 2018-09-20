import React from 'react';
import './build_controls.scss';
import BuildControl from 'Components/Burger/BuildControls/BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className="build-controls">
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl 
        key={ctrl.label} 
        label={ctrl.label} 
        added={() => props.ingredientAdd(ctrl.type)} 
        removed={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <button className="order-button"
    disabled={!props.purchasable}>ORDER NOW</button>
  </div>
);

export default buildControls;