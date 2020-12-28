/////////////////////////////////////////
// Creat State to be used across the App
// Be sure <Provider></Provider> 
// is around the Apps using this store.
/////////////////////////////////////////

import counterReducer from './counter';
import loggedReducer from './isLoggedIn';
import headerReducer from './header';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLoggedIn: loggedReducer,
    headerTag: headerReducer
});

export default allReducers;