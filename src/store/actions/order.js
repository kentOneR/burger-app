import * as actionTypes from './actionTypes';
import axios from '../../AxiosOrders';

export const burgerPurchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const burgerPurchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
    .then(res => {
      console.log(res.data);
      dispatch(burgerPurchaseSuccess(res.data.name, orderData));
    })
    .catch(error => {
      dispatch(burgerPurchaseFail(error));
    });
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}