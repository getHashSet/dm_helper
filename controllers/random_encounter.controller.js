const router = require("express").Router();
const db = require("../models");
const axios = require('axios');

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
      enemies: [],
    },
  };

  function Enemy(name, armor_class, challenge_rating, hit_dice, strength, dexterity, constitution, intelligence, wisdom, charisma,actions) {
    this.enemyName = name;
    this.ac = armor_class;
    this.cr = challenge_rating;
    this.hitDice = hit_dice;
    this.stats = {};
    this.stats.STR = strength;
    this.stats.DEX = dexterity;
    this.stats.CON = constitution;
    this.stats.INT = intelligence;
    this.stats.WIS = wisdom;
    this.stats.CHA = charisma;
    this.actions = actions;
  }

  // res.json(devEncounter);

  const monsterNames = ["bugbear", "goblin"];

  const category = 'monsters/'

  const apiURI = 'https://www.dnd5eapi.co/api/'

  const monsterJSON = apiURI + category + monsterNames[0];

  axios.get(monsterJSON)
  .then(callback => {

    const e = callback.data;

    const newEnemy = new Enemy(e.name,
      e.armor_class,
      e.challenge_rating,
      e.hit_dice,
      e.strength,
      e.dexterity,
      e.constitution,
      e.intelligence,
      e.wisdom,
      e.charisma,
      e.actions);

      
      devEncounter.encounter.enemies.push(newEnemy);
      console.log(newEnemy);
      
    res.send(devEncounter);
  });

});

// Read One
router.route("/:id").get((req, res) => {
  db.Enemy.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
