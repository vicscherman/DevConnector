//reducer for alerts to user
//takes in any state that has to do with alerts
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      //adding alert message to array of messages
      return [...state, payload];
    case REMOVE_ALERT:
      //filter out alert by the id(after 5 seconds)
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
