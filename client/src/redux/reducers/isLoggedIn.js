//////////////////////////////////
// Set if user is signed in.
//////////////////////////////////

const loggedReducer = (state = false, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return action.payload;
        default:
            return state;
    };
};

export default loggedReducer;