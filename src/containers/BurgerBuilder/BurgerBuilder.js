import React, {Component} from 'react';
import Auxi from 'Hoc/Auxi';
import Burger from 'Components/Burger/Burger';
import BuildControls from 'Components/Burger/BuildControls/BuildControls';
import Modal from 'Components/UI/Modal/Modal';
import OrderSummary from 'Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.8
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type],  
          updatedCount = oldCount + 1,
          updatedIngredients = {
            ...this.state.ingredients
          };
    updatedIngredients[type] = updatedCount;
    
    const oldPrice = this.state.totalPrice,
          updatePrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatePrice
    })

    this.updatePurchase(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updateCount = oldCount - 1,
          updatedIngredients = {
            ...this.state.ingredients
          };
    
    updatedIngredients[type] = updateCount;

    const oldPrice = this.state.totalPrice,
          priceDed = oldPrice - INGREDIENT_PRICES[type];
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: priceDed
    })

    this.updatePurchase(updatedIngredients);
  }

  updatePurchase = (el) => {
    const sum = Object.keys(el)
                .map(key => el[key])
                .reduce((acc, curVal) => acc + curVal, 0);

    console.log(sum);
    this.setState({purchasable: sum > 0});
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Auxi>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice} 
          ingredientAdd={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable} />
      </Auxi>
    );
  }
}

export default BurgerBuilder;