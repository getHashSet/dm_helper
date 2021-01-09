export const d = (diceType, diceTotal = 1) => {
    let finalNumber;
    for (let i = 0; i < diceTotal; i++) {
        finalNumber =+ (Math.floor(Math.random() * diceType) + 1);
    };
    return finalNumber;
}

//   DICE   //
export const d100 = () => { return d(100) };
export const d20 = () => { return d(20) };
export const d12 = () => { return d(12) };
export const d10 = () => { return d(10) };
export const d8 = () => { return d(8) };
export const d6 = () => { return d(6) };
export const d4 = () => { return d(4) };
export const coin = () => { return d(2) === 2 ? "Heads" : "Tails" }