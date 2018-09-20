import React from 'react';
import Auxi from '../../../hoc/Auxi';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return <li key={key}><span>{key}</span>: {props.ingredients[key]}</li>
    });

  return (
    <Auxi>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Auxi>
  );
};

export default orderSummary;