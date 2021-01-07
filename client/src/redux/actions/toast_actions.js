//////////////////////////////////
// Show Toast Actions
//////////////////////////////////

export const showToastMenuState = (bool) => {
    return {
        type: 'TOASTSTATE',
        payload: bool
    }
};

export const updateToastData = (child) => {
    return {
        type: 'TOASTDATA',
        payload: child
    }
};