import React from 'react';
import Burger from 'Components/Burger/Burger';
import Button from 'Components/UI/Button/Button';

import './checkout_summary.scss';

const checkoutSummary = (props) => {
  return (
    <div className="checkout-summary">
      <h1>We hope it tastes well!!</h1> 
      <div className="checkout-summary checkout-summary__burger">
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger" clicked>CANCEL</Button>
      <Button btnType="success" clicked>CONTINUE</Button>
    </div>
  )
}

export default checkoutSummary;