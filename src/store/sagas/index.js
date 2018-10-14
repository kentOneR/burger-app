import {authLogout, checkAuthTimeout, authUserSaga, authCheckState} from './auth';
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(
        actionTypes.AUTH_INIT_LOGOUT,
        authLogout
    );
    yield takeEvery(
        actionTypes.AUTH_CHECK_TIMEOUT,
        checkAuthTimeout
    );
    yield takeEvery(
        actionTypes.AUTH_USER,
        authUserSaga
    );
    yield takeEvery(
        actionTypes.AUTH_CHECK_STATE,
        authCheckState
    );
}