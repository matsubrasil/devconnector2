import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOAD,
  AUTH_ERROR,
} from './../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      // console.log('payload', payload);
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default auth;
