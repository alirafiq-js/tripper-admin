import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  GET_ME_FAILED,
  GET_ME_SUCCESS
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const auth_reducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
          user: action.data.data
        }
    case LOGIN_FAILED:
      return {
        ...state,
        user: null
      }
    case LOGOUT_SUCCESS:
      localStorage.removeItem('auth');
      return {
        ...state,
        user: null
      }
    case GET_ME_SUCCESS:
      return {
        ...state,
        user: action.data.data
      }
    case GET_ME_FAILED:
      localStorage.removeItem('token')
      return Object.assign(
        {},
        ...state,
        { user: null }
      );

    default:
      return state;
  }
};

export default auth_reducer;