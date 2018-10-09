import * as actionsTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START: return {...state, error: null, loading: true};
    case actionsTypes.AUTH_SUCCESS: return {...state, token: action.idToken, userId: action.userId ,error: null, loading: false};
    case actionsTypes.AUTH_FAIL: return {...state, error: action.error, loading: false};
    default: return state;
  }
}

export default reducer;