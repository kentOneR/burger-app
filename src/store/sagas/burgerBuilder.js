import { put } from 'redux-saga/effects';
import axios from '../../AxiosOrders';
import * as actions from '../actions/index';



export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get('https://burgerapp-17e7d.firebaseio.com/ingredients.json');
    yield put(actions.setIngredients(res.data));
  } catch(error) {
    yield put(actions.fetchIngFailed());
  }
}