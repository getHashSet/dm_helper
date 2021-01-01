const seed_enemy = [
    {
        type: "Attack", // attack, item, spell, passive
        actionType: "Action", // action, bonus action, passive, reaction.
        actionName: "Greataxe", // defaults to "Action"
        damageDice: "1d12", // "3d10"
        damageMod: "STR", // default is 0. This gets added to hit and damage.
        hitMod: 2, // default is 2
        description: "Greataxe. Melee Weapon Attack: 2 + STR to hit, reach 5ft, one target. Hit: (1d12 + STR) slashing damage.", // "An attack that does 3d10 + 0 damage. +2 to hit."
        charges: 512, // default is 512.
        date: { type: Date, default: Date.now }
    },
    {
        type: "Attack", // attack, item, spell, passive
        actionType: "Action", // action, bonus action, passive, reaction.
        actionName: "Javelin", // defaults to "Action"
        damageDice: "1d6", // "3d10"
        damageMod: "STR", // default is 0. This gets added to hit and damage.
        hitMod: 2, // default is 2
        description: "Javelin. Melee or Ranged Weapon Attack: 2 + STR to hit, 5ft or range 30/120 ft. Hits for (1d6 + DEX) piercing damage.", // "An attack that does 3d10 + 0 damage. +2 to hit."
        charges: 20, // default is 512.
        date: { type: Date, default: Date.now }
    },
    {
        type: "Passive", // attack, item, spell, passive
        actionType: "Bonus Action", // action, bonus action, passive, reaction.
        actionName: "Aggressive", // defaults to "Action"
        damageDice: "NA", // "3d10"
        damageMod: "NA", // default is 0. This gets added to hit and damage.
        hitMod: 0, // default is 2
        description: "Orcs can use their bonus actions to move up to their speed to a target.", // "An attack that does 3d10 + 0 damage. +2 to hit."
        charges: 512, // default is 512.
        date: { type: Date, default: Date.now }
    },
    {
        type: "Passive",
        actionType: "Passive",
        actionName: "Pack Tactics",
        damageDice: "NA",
        damageMod: "NA",
        hitMod: 0,
        description: "Pack Tactics grants advantage on attack rolls when at least one ally is within 5ft of the creature being attacked.", // "An attack that does 3d10 + 0 damage. +2 to hit."
        charges: 512,
        date: { type: Date, default: Date.now }
    },
    {
        type: "Passive",
        actionType: "Passive",
        actionName: "Keen Hearing and Smell",
        damageDice: "NA",
        damageMod: "NA",
        hitMod: 0,
        description: "Advantage to all perception checks that rely on hearing or smell.", // "An attack that does 3d10 + 0 damage. +2 to hit."
        charges: 512,
        date: { type: Date, default: Date.now }
    },
    {
        type: "Attack",
        actionType: "Action",
        actionName: "Bite",
        damageDice: "2d6",
        damageMod: "STR",
        hitMod: 2,
        description: "If target is hit, it must succeed on a DC13 Strength saving throw or be knocked prone.", // "An attack that does 3d10 + 0 damage. +2 to hit."
        charges: 512,
        date: { type: Date, default: Date.now }
    },
]

module.exports = seed_portfolio;