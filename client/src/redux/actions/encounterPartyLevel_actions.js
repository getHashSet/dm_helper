// ===================== //
// ENCOUNTER PARTY LEVEL //
// ===================== //

export const setPartyLevel = (int) => {
    return {
        type: 'PartyLevelUpdated',
        payload: int
    }
};