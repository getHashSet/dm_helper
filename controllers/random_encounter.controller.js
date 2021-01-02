const router = require("express").Router();
const db = require("../models");
const axios = require('axios');

// Read All
router.route("/").post(function (req, res) {

  const enemies = req.body.enemies.length <= 0 ? ["owlbear"] : req.body.enemies;

  console.log("============= CALLING 5e API ==============");
  console.log(enemies);

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
    this.special_abilities = {};
  }

  // res.json(devEncounter);

  const category = 'monsters/';

  const apiURI = 'https://www.dnd5eapi.co/api/';

  function buildCallback() {
    return new Promise(() => {

      enemies.forEach((enemy_name, index) => {
        const monsterJSON = apiURI + category + enemy_name;
    
        console.log(`building ${enemy_name}`)

        axios.get(monsterJSON)
        .then(callback => {
      
          const e = callback.data; // this is the monster object from the api
      
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
            e.actions
            )

            // EDGECASE: may have special bilities. May be null or undefied.
            if (e.special_abilities !== undefined && e.special_abilities !== null) {
              newEnemy.special_abilities = e.special_abilities;
            };

            devEncounter.encounter.enemies.push(newEnemy);
            
            if(enemies.length === index + 1) {
              console.log(devEncounter.encounter.enemies);
              res.json(devEncounter);
            };
        }).catch(err => {
          // skip if you cant find it.
        });
      });
    });
  }
  
  async function asyncCall() {
    await buildCallback();
  };
  
  asyncCall();

});

// Read One
router.route("/:id").get((req, res) => {
  db.Enemy.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
