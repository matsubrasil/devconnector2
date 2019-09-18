import axios from 'axios';

import { setAlert } from './alert.actions';

import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register

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

    // const dados = await res.data;
    // console.log('dados ==>', dados);
    // res.data = { success: true, token: 'asaoskaos....'}
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });
  } catch (err) {
    // console.log('err.response ==>', err.response);
    // console.log('error ++++');

    const errors = await err.response.data;
    // err.response.data = {
    //   success: false,
    //   message: { password: 'Confirm password no match' }
    // }
    // console.log('error ** => ', errors);

    const listErrors = Object.entries(errors.message);

    // console.log('listErrors', listErrors);

    //
    if (listErrors.length > 0) {
      // error[0][0] = 'password'
      // error[0][1] = 'Confirm password no match'
      listErrors.forEach(error => dispatch(setAlert(error[1], 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
