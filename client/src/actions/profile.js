import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

const config = {
  headers:{
    'Content-Type': 'application/json'
  }
}

//Get the current user's profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//action to create or update a profile
//history for redirect //edit is to know if it's an update or new profile. We need to use
//history because it's in an action, not a component (can't use redirect component)

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
 

      const res = await axios.post('/api/profile', formData, config);
    

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))

      if(!edit){
        history.push('/dashboard')
      }

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      })
  };

}
