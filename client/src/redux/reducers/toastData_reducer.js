//////////////////////////////////
// Toast data
//////////////////////////////////

const toastData = (state = "Yarrrr", action) => {
    switch(action.type) {
        case 'TOASTDATA':
            return action.payload;
        default:
            return state;
    };
};
export default toastData;