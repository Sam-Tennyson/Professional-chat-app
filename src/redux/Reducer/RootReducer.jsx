import { combineReducers } from 'redux';
import Auth from './Auth';


const appReducer = combineReducers({
  auth: Auth,
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;