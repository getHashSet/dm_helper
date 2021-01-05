export const updateUserName = (userNameStr) => {
    return {
        type: 'UPDATEUSERNAME',
        payload: userNameStr
    }
};