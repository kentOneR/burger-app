import {authLogout} from './auth';
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(
        actionTypes.AUTH_INIT_LOGOUT,
        authLogout
    )
}