//////////////////////////////////
// Example of state and actions.
//////////////////////////////////

const counterReducer = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return action.payload > 0 ? state + action.payload : state + 1;
        case 'DECREMENT':
            return action.payload > 0 ? state - action.payload : state - 1;
        default:
            return state;
    };
};
export default counterReducer;