//////////////////////////////////
// Set the state for <h1> tags
//////////////////////////////////

const headerReducer = (state = "", action) => {
    switch(action.type) {
        case 'HEADER':
            return action.payload;
        default:
            return 'hello, world'
    };
};
export default headerReducer;