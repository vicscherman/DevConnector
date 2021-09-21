import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';
//being called when set alert is called.Set alert ACTION
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  //generate id, send message (in the initial case of passwords not matching
  // it was passwords not matching, danger type)
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
