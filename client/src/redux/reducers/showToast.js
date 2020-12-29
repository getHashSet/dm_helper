//////////////////////////////////
// Toast is visible?
//////////////////////////////////

const showToastReducer = (state = false, action) => {
    switch(action.type) {
        case 'TOASTSTATE':
            return action.payload;
        default:
            return state;
    };
};
export default showToastReducer;