const router = require("express").Router();
const db = require("../models");
const axios = require('axios');

// Enemy Encounters!

const enemyTable = [
  {
    desc: "You hear a sound in the woods near by.",
    info: "DC for finding the owlbear eating berries is 10.",
    enemies: ["owlbear"]
  },
  {
    desc: "You can smell smoke on the air. You are down wind from a campfire.",
    info: "Players aproach orcs putting up camp. Sneak DC: 17.",
    enemies: ["orc","orc","orc","wolf", "wolf"],
  },
  {
    desc: "You stumble across a pile of loose coins mixed in with a lump of dirt on the ground.",
    info: "If the players dig up the dirt they find 5d100 silver pieces. If they collect more than 200 they will be followed by the dragon. If the dragon feels he can take a party member from behind and drag them into the woods he will. If HP goes below half the dragon flees.",
    enemies: ["young-green-dragon"],
  }
];

// Read All
router.route("/").post(function (req, res) {

  const d100 = Math.floor(Math.random() * enemyTable.length);

  let enemies;
  let devEncounter = {
    encounter: {
      desc: "",
      info: "",
      enemies: [],
    },
  };

  if (req.body.enemies.length === 0){
    devEncounter.encounter.desc = enemyTable[d100].desc;
    devEncounter.encounter.info = enemyTable[d100].info;
    enemies = enemyTable[d100].enemies;
  } else {
    enemies = req.body.enemies;
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

      let counter = 0;

      enemies.forEach((enemy_name, index) => {
        const monsterJSON = apiURI + category + enemy_name.toLowerCase().trim();
    
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
            counter++;

            if(enemies.length === counter) {
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
