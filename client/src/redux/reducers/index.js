/////////////////////////////////////////
// Creat State to be used across the App
// Be sure <Provider></Provider> 
// is around the Apps using this store.
/////////////////////////////////////////

import loggedReducer from './isLoggedIn';
import headerReducer from './header';
import encounterPartyLevel from './encounterPartyLevel';
import encounterChallengeRating from './encounterChallengeRating';
import { combineReducers } from 'redux';
import showToastReducer from './showToast';
import toastData from './toastData_reducer';
import userNameReducer from './userName_reducer';

const allReducers = combineReducers({
    userName: userNameReducer,
    isLoggedIn: loggedReducer,
    headerTag: headerReducer,
    partyLevel: encounterPartyLevel,
    challengeRating: encounterChallengeRating,
    showToastMenu: showToastReducer,
    currentToastData: toastData
});

export default allReducers;