import React from 'react';
import './build_controls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className="build-controls">
    {controls.map(ctrl => (
      <BuildControl 
        key={ctrl.label} 
        label={ctrl.label} 
        added={() => props.ingredientAdd(ctrl.type)} 
        removed={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
  </div>
);

export default buildControls;