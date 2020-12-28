// ===================== //
// ENCOUNTER PARTY LEVEL //
// ===================== //

const encounterPartyLevelReducer = (state = "", action) => {
    switch(action.type) {
        case 'PartyLevelUpdated':
            return action.payload;
        default:
            return '1'
    };
};
export default encounterPartyLevelReducer;