export const getStatMod = (stat) => {
    if (+stat > 9 && +stat < 12) { return };
    return Math.floor((stat - 10) / 2);
};