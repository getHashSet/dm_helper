// ===================== //
// ENCOUNTER PARTY LEVEL //
// ===================== //

export const setEncounterCR = (int) => {
    return {
        type: 'EncounterRatingUpdated',
        payload: int
    }
};