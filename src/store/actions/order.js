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

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json' + token, orderData)
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
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('orders.json?auth=' + token)
    .then(res => {
      let fetchedorders = [];
      for (let key in res.data) {
        fetchedorders.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(fetchOrdersSuccess(fetchedorders));
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error));
    })
  }
}
