import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxi from 'Hoc/Auxi';
import Burger from 'Components/Burger/Burger';
import BuildControls from 'Components/Burger/BuildControls/BuildControls';
import Modal from 'Components/UI/Modal/Modal';
import OrderSummary from 'Components/Burger/OrderSummary/OrderSummary';
import Spinner from 'Components/UI/Spinner/Spinner';
import axios from '../../AxiosOrders';
import withErrorHandler from 'Hoc/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchase = (el) => {
    const sum = Object.keys(el)
                .map(key => el[key])
                .reduce((acc, curVal) => acc + curVal, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = (this.props.error) ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Auxi>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price} 
            ingredientAdd={this.props.onAddIngredient}
            ingredientRemove={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandler} 
            isAuth={this.props.isAuth}/>
        </Auxi>
      );

      orderSummary = <OrderSummary
      price={this.props.price} 
      ingredients={this.props.ings}
      purchaseContinue={this.purchaseContinueHandler}
      purchaseCancel={this.purchaseCancelHandler} />;
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (name) => dispatch(actions.addIngredient(name)),
    onRemoveIngredient: (name) => dispatch(actions.removeIngredient(name)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));