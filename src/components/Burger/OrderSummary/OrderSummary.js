import React from 'react';
import Auxi from 'Hoc/Auxi';
import Button from 'Components/UI/Button/Button';

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
      <p><strong>Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="danger" clicked={props.purchaseCancel}>CANCEL</Button>
      <Button btnType="success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Auxi>
  );
};

export default orderSummary;