//Multiple reducers  are combined here
import { combineReducers } from 'redux';
import alert from './alert'

export default combineReducers({
  alert
});
