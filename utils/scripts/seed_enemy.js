const seed_enemy = [
    {
        enemyName: "Orc",
        ac: 13,
        cr: .5,
        hitDice: "2d10",
        movement: [ "walk" ],
        stats: {
            STR: 16,
            DEX: 12,
            CON: 16,
            INT: 7,
            WIS: 11,
            CHA: 10
        },
        actionsNumber: 1,
        actions: ["Greataxe", "Aggressive"], // see actions schema
        date: { type: Date, default: Date.now }
    },
    {
        enemyName: "Orc",
        ac: 14,
        cr: .5,
        hitDice: "2d8",
        movement: [ "walk", "climb" ],
        stats: {
            STR: 14,
            DEX: 16,
            CON: 15,
            INT: 8,
            WIS: 12,
            CHA: 8
        },
        actionsNumber: 1,
        actions: ["Javelin", "Aggressive"], // see actions schema
        date: { type: Date, default: Date.now }
    },
    {
        enemyName: "Wolf",
        ac: 13,
        cr: .25,
        hitDice: "2d6",
        movement: [ "walk" ],
        stats: {
            STR: 12,
            DEX: 15,
            CON: 12,
            INT: 3,
            WIS: 12,
            CHA: 6
        },
        actionsNumber: 1,
        actions: ["Bite", "Keen Hearing and Smell", "Pack Tactics"], // see actions schema
        date: { type: Date, default: Date.now }
    },
]

module.exports = seed_portfolio;