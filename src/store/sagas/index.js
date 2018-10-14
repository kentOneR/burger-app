import {authLogout, checkAuthTimeout, authUserSaga, authCheckState} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, authLogout);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState);
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga
  );
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}