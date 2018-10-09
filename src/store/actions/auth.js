import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1eR6V6FWNIkTIn-zC8sBypannfWLwN0I';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1eR6V6FWNIkTIn-zC8sBypannfWLwN0I';
    }

    axios.post(url, authData)
      .then(res => {
        console.log(res);        
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  }
}