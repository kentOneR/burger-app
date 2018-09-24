import React, {Component} from 'react';
import Auxi from 'Hoc/Auxi';
import Burger from 'Components/Burger/Burger';
import BuildControls from 'Components/Burger/BuildControls/BuildControls';
import Modal from 'Components/UI/Modal/Modal';
import OrderSummary from 'Components/Burger/OrderSummary/OrderSummary';
import axios from '../../AxiosOrders';
import Spinner from 'Components/UI/Spinner/Spinner';
import withErrorHandler from 'Hoc/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.8
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://burgerapp-17e7d.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ingredients: res.data});
      })
      .catch(error => {
        this.setState({error: true})
      });
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

    this.setState({purchasable: sum > 0});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});

    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max Schar',
        address: {
          zipCode: '78190',
          country: 'France'
        }
      }
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = (this.state.error) ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Auxi>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice} 
            ingredientAdd={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} />
        </Auxi>
      );

      orderSummary = <OrderSummary
      price={this.state.totalPrice} 
      ingredients={this.state.ingredients}
      purchaseContinue={this.purchaseContinueHandler}
      purchaseCancel={this.purchaseCancelHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxi>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Auxi>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);