//////////////////////////////////
// Show Toast Actions
//////////////////////////////////

export const showToastMenuState = (bool) => {
    return {
        type: 'TOASTSTATE',
        payload: bool
    }
};