// ================ //
// CHALLENGE RATING //
// ================ //

const encounterPartyLevelReducer = (state = "", action) => {
    switch(action.type) {
        case 'EncounterRatingUpdated':
            return action.payload;
        default:
            return '3'
    };
};
export default encounterPartyLevelReducer;