const router = require("express").Router();
const db = require("../models");

// Read All
router.route("/").get(function (req, res) {
  // console.log(req.query)
  // db.Enemy
  //     .find()
  //     .sort({ date: -1 })
  //     .then(dbModel => {
  //         console.log(dbModel)
  //         res.json(dbModel)
  //     })
  //     .catch(err => res.status(422).json(err));

  const devEncounter = {
    encounter: {
      description:
        "As you walk further on your quest you can smell a campfire on the air. You stumble across some orcs cooking something over a campfire.",
      info: "Perception check to see the hidden wolf up ahead. (15)",
      enemies: [
        {
          enemyName: "Orc",
          ac: 13,
          cr: 0.5,
          hitDice: "2d10",
          movement: ["walk"],
          stats: {
            STR: 16,
            DEX: 12,
            CON: 16,
            INT: 7,
            WIS: 11,
            CHA: 10,
          },
          actionsNumber: 1,
          actions: [
            {
              type: "Attack", // attack, item, spell, passive
              actionType: "Action", // action, bonus action, passive, reaction.
              actionName: "Greataxe", // defaults to "Action"
              damageDice: "1d12", // "3d10"
              damageMod: "STR", // default is 0. This gets added to hit and damage.
              hitMod: 2, // default is 2
              description:
                "Greataxe. Melee Weapon Attack: 2 + STR to hit, reach 5ft, one target. Hit: (1d12 + STR) slashing damage.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              date: { type: Date, default: Date.now },
            },
            {
              type: "Attack", // attack, item, spell, passive
              actionType: "Action", // action, bonus action, passive, reaction.
              actionName: "Javelin", // defaults to "Action"
              damageDice: "1d6", // "3d10"
              damageMod: "STR", // default is 0. This gets added to hit and damage.
              hitMod: 2, // default is 2
              description:
                "Javelin. Melee or Ranged Weapon Attack: 2 + STR to hit, 5ft or range 30/120 ft. Hits for (1d6 + DEX) piercing damage.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              charges: 2, // default is 512.
              emptyChargesMessage: "You have no more javelins left",
              date: { type: Date, default: Date.now },
            },
            {
              type: "Passive", // attack, item, spell, passive
              actionType: "Bonus Action", // action, bonus action, passive, reaction.
              actionName: "Aggressive", // defaults to "Action"
              damageDice: "NA", // "3d10"
              damageMod: "NA", // default is 0. This gets added to hit and damage.
              hitMod: 0, // default is 2
              description:
                "Orcs can use their bonus actions to move up to their speed to a target.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              date: { type: Date, default: Date.now },
            },
          ],
          date: { type: Date, default: Date.now },
        },
        {
          enemyName: "Orc",
          ac: 14,
          cr: 0.5,
          hitDice: "2d8",
          movement: ["walk", "climb"],
          stats: {
            STR: 14,
            DEX: 16,
            CON: 15,
            INT: 8,
            WIS: 12,
            CHA: 8,
          },
          actionsNumber: 1,
          actions: [
            {
              type: "Attack", // attack, item, spell, passive
              actionType: "Action", // action, bonus action, passive, reaction.
              actionName: "Javelin", // defaults to "Action"
              damageDice: "1d6", // "3d10"
              damageMod: "STR", // default is 0. This gets added to hit and damage.
              hitMod: 2, // default is 2
              description:
                "Javelin. Melee or Ranged Weapon Attack: 2 + STR to hit, 5ft or range 30/120 ft. Hits for (1d6 + DEX) piercing damage.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              charges: 20, // default is 512.
              date: { type: Date, default: Date.now },
            },
          ], // see actions schema
          date: { type: Date, default: Date.now },
        },
        {
          enemyName: "Wolf",
          ac: 13,
          cr: 0.25,
          hitDice: "2d6",
          movement: ["walk"],
          stats: {
            STR: 12,
            DEX: 15,
            CON: 12,
            INT: 3,
            WIS: 12,
            CHA: 6,
          },
          actionsNumber: 1,
          actions: [
            {
              type: "Attack",
              actionType: "Action",
              actionName: "Bite",
              damageDice: "2d6",
              damageMod: "STR",
              hitMod: 2,
              description:
                "If target is hit, it must succeed on a DC13 Strength saving throw or be knocked prone.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              charges: 512,
              date: { type: Date, default: Date.now },
            },
            {
              type: "Passive",
              actionType: "Passive",
              actionName: "Pack Tactics",
              damageDice: "NA",
              damageMod: "NA",
              hitMod: 0,
              description:
                "Pack Tactics grants advantage on attack rolls when at least one ally is within 5ft of the creature being attacked.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              charges: 512,
              date: { type: Date, default: Date.now },
            },
            {
              type: "Passive",
              actionType: "Passive",
              actionName: "Keen Hearing and Smell",
              damageDice: "NA",
              damageMod: "NA",
              hitMod: 0,
              description:
                "Advantage to all perception checks that rely on hearing or smell.", // "An attack that does 3d10 + 0 damage. +2 to hit."
              charges: 512,
              date: { type: Date, default: Date.now },
            },
          ], // see actions schema
          date: { type: Date, default: Date.now },
        },
      ],
    },
  };

  res.json(devEncounter);
});

// Read One
router.route("/:id").get((req, res) => {
  db.Enemy.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
