import axios from 'axios';
import { setAlert } from './alert.actions';
import setAuthToken from './../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOAD,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    //c onst res = axios.get('/api/auth'); <== traversy
    const res = await axios.get('/api/users');
    // res.data => { success: true, user: { id, name, email, avatar, create_at }
    const user = res.data.user;
    console.log('user auth.actions => ', user);
    dispatch({
      type: USER_LOAD,
      payload: user,
    });

    //
  } catch (err) {
    /*
    const errors = await err.response.data;
    console.log('errors - loadUser =>', errors);
    // err.response.data = {
    //   success: false,
    //   message: { password: 'Confirm password no match' }
    // }
    // console.log('error ** => ', errors);

    const message = errors.message;

    if (typeof message === 'object') {
      // error[0][0] = 'password'
      // error[0][1] = 'Confirm password no match'
      const listErrors = Object.entries(message);
      listErrors.forEach(error => dispatch(setAlert(error[1], 'danger')));
    } else {
      dispatch(setAlert(message, 'danger', 3000));
    }

    console.log('message', message);
    */

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({
  name,
  email,
  password,
  password2,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, password2 });
  try {
    const res = await axios.post('/api/auth/register', body, config);

    const dados = await res.data;

    console.log('dados ==>', dados);
    console.log('toke==>', res.data.token);
    //res.data = { success: true, token: 'asaoskaos....'}

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });

    dispatch(loadUser());

    //
  } catch (err) {
    const errors = await err.response.data;
    // console.log('errors - register =>', errors);
    // err.response.data = {
    //   success: false,
    //   message: { password: 'Confirm password no match' }
    // }
    // console.log('error ** => ', errors);

    const message = errors.message;

    if (typeof message === 'object') {
      // error[0][0] = 'password'
      // error[0][1] = 'Confirm password no match'
      const listErrors = Object.entries(message);
      listErrors.forEach(error => dispatch(setAlert(error[1], 'danger')));
    } else {
      dispatch(setAlert(message, 'danger', 3000));
    }

    // console.log('message', message);

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });

    dispatch(loadUser());

    //
  } catch (err) {
    const errors = await err.response.data;

    const message = errors.message;

    if (typeof message === 'object') {
      const listErrors = Object.entries(message);
      listErrors.forEach(error => dispatch(setAlert(error[1], 'danger')));
    } else {
      dispatch(setAlert(message, 'danger', 3000));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
