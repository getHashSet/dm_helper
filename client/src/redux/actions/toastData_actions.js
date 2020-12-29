//////////////////////////////////
// Toast Data Actions
//////////////////////////////////

export const updateToastData = (child) => {
    return {
        type: 'TOASTDATA',
        payload: child
    }
};