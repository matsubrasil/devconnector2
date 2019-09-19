import axios from 'axios';
//import { setAlert } from './alert.actions';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user profile

export const getCurrentProfile = () => async dispatch => {
  /*
{
      success: true,
      profile: result.rows[0],
      social: result_social.rows[0],
    }
*/
  try {
    const res = await axios.get('api/profile/me');

    const profile = res.data.profile;
    profile.social = res.data.social;

    console.log('profile', profile);
    dispatch({
      type: GET_PROFILE,
      payload: profile,
    });

    //
  } catch (err) {
    console.log('front-end getCurrentProfile =>', err.response);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
