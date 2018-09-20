import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdd={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo} />
      </Auxi>
    );
  }
}

export default BurgerBuilder;