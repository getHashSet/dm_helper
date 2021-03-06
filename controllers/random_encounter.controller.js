const router = require("express").Router();
const db = require("../models");
const axios = require('axios');

// Enemy Encounters!
let enemyTable = [
  {
    desc: "You hear a sound in the woods near by.",
    info: "DC for finding the owlbear eating berries is 10.",
    enemies: ["owlbear"]
  },
  {
    desc: "You stumble across a pile of loose coins mixed in with a lump of dirt on the ground.",
    info: "If the players dig up the dirt they find 5d100 silver pieces. If they collect more than 200 they will be followed by the dragon. If the dragon feels he can take a party member from behind and drag them into the woods he will. If HP goes below half the dragon flees.",
    enemies: ["young-green-dragon"],
  },
];

const d4Weapons = ["Club", "Dagger", "Torch", "Damaged Mace", "Scimitar", "Plowshare", "Rock", "Shovel"];
const d6Weapons = ["Scimitar", "Shortsword", "Rusty Sword", "Damaged Crossbow", "Short Spear"];

const randomItemFrom = (arr) => {
  const maxNumber = arr.length;
  const randomNumber = Math.floor(Math.random() * maxNumber);
  const item = arr[randomNumber];
  return item;
};

// Read All
router.route("/").post(function (req, res) {
  let theCr = 1;
  let theMod = 0;
  if (req.body.cr !== undefined || req.body.cr !== null) { theCr = req.body.cr };
  if (req.body.mod !== undefined || req.body.mod !== null) { theMod = req.body.mod };
  let highCr = +theCr + 1 + +theMod;
  let lowCr = +theCr + - 1 + +theMod;
  if (lowCr > 10) { lowCr = 10 };
  if (highCr < 1) { highCr = 1 };
  // db.Encounters.find({ "cr": {$gt : lowCr, $lt : highCr}});

  // STEP 1: Get location and cr from req.body. Or set them to default.
  let location = req.body.location ? req.body.location.toLowerCase() : "default";
  let cr = req.body.cr ? +req.body.cr : 5;

  // EDGECASE: check if encounter is friendly
  if (location === 'friendly') { lowCr = 1 };
  if (location === 'road') { location = "plains" }
  // console.log("Low: " + lowCr + " High: " + highCr);
  // STEP 2: check Encounters collection in the database for anything that meets that information.
  db.Encounters
    .find({ "cr": { $gte: lowCr, $lte: highCr }, "location": location })
    .then(encounterTable => {

      // console.log(encounterTable.length);

      // Check to see if that encounter table we got back was empty []. If it was then use the backup table up top.
      const goodData = encounterTable[0] !== undefined ? encounterTable : enemyTable; //[ {enemies, _id, info, } ]

      // Get a random number between 0 and the goodData table's length.
      const d100 = Math.floor(Math.random() * goodData.length);

      // Set variables to defaults.
      let enemies = ["mage"];
      let devEncounter = {
        encounter: {
          desc: "Welcome to enemy encounters!",
          info: "To roll saving throws just click the stat you need to make a save on. TableTop Squire is being updated all the time so feel free to click around.",
          enemies: [], // do not fill this out. The built enemies will be returned to the front end.
        },
      };

      // check if req.body.enemies has a length. That means the user sent us a custom encounter
      if (req.body.enemies[0] === undefined) {
        // If the user did not send us data set the encounter based on the goodData we already have.
        devEncounter.encounter.desc = goodData[d100].desc;
        devEncounter.encounter.info = goodData[d100].info;
        enemies = goodData[d100].enemies;
      } else {
        enemies = req.body.enemies;
      };

      // Build an object constructor that matches our schema for an Enemy
      function Enemy(name, armor_class, challenge_rating, hit_dice, strength, dexterity, constitution, intelligence, wisdom, charisma, actions, initiative) {
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
        this.spells = [];
        this.spellSlots = {};
        this.spell_caster = false;
      }

      // STEP 3: Create URL that will be used.
      const apiURI = 'https://www.dnd5eapi.co/api/';
      const category = 'monsters/';

      // STEP 4: Reach out to the D&D 5e API multiple times.
      function buildCallback() {
        return new Promise(() => {

          let counter = 0;

          enemies.forEach((enemy_name, index) => {
            const monsterJSON = apiURI + category + enemy_name.toLowerCase().trim();

            // console.log(`building ${enemy_name}`)

            axios.get(monsterJSON)
              .then(callback => {

                const e = callback.data; // this is the monster object from the api

                const spells = [];

                const spellSlots = {};

                const rollInitiative = (stat) => {
                  const j = Math.floor(Math.random() * 20) + 1;
                  if (+stat > 9 && +stat < 12) { return j; };
                  const result = Math.floor((stat - 10) / 2) + j;
                  return result > 0 ? result : 1;
                };

                const getStatMod = (stat) => {
                  if (+stat > 9 && +stat < 12) { return 0; };
                  const result = Math.floor((stat - 10) / 2);
                  return result;
                }

                const enemyInit = rollInitiative(e.dexterity);

                let newEnemy = new Enemy(e.name,
                  e.armor_class,
                  e.challenge_rating,
                  e.hit_dice,
                  e.strength,
                  e.dexterity,
                  e.constitution,
                  e.intelligence,
                  e.wisdom,
                  e.charisma,
                  e.actions,
                  spells,
                  spellSlots,
                  e.spell_caster,
                );

                newEnemy.initiative = enemyInit;

                // check if caster
                try {
                  // console.log(e.special_abilities[0].spellcasting);
                  newEnemy.spells = e.special_abilities[0].spellcasting.spells ? e.special_abilities[0].spellcasting.spells : [];
                  newEnemy.spellSlots = e.special_abilities[0].spellcasting.slots ? e.special_abilities[0].spellcasting.slots : {};
                  newEnemy.spell_caster = true;
                } catch (error) {
                  // skip
                };

                // EDGECASE: may have special bilities. May be null or undefied.
                if (e.special_abilities !== undefined && e.special_abilities !== null) {
                  newEnemy.special_abilities = e.special_abilities;
                };

                // add or change actions
                if (newEnemy.actions[0].name === "Scimitar") { newEnemy.actions[0].name = randomItemFrom(d6Weapons) };
                if (newEnemy.actions[0].name === "Club") { newEnemy.actions[0].name = randomItemFrom(d4Weapons) };
                if (e.type === "humanoid") {
                  // add a net to the actions
                  const net = {
                    name: "Net",
                    desc: "A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature",
                    save: {
                      save_bonus: getStatMod(e.dexterity),
                      desc: "Or be restrained",
                      instructions: "Range 5/15",
                      disadvantage: false
                    }
                  }

                  const shove = {
                    name: "Shove",
                    desc: "Roll a contested STR check to knock an enemy prone.",
                    save: {
                      save_bonus: getStatMod(e.strength),
                      desc: "Or go prone",
                      instructions: "Roll an Athletics or Acrobatics check vs",
                      disadvantage: false
                    }
                  }

                  const pokeEye = {
                    name: "Poke in the Eye",
                    desc: "Make a called shot to a targets eyes in an attempt to blind them.",
                    save: {
                      save_bonus: getStatMod(e.dexterity),
                      desc: "or go blind for 1d4 rounds.",
                      instructions: "Roll a dexterity save vs",
                      disadvantage: true
                    }
                  }

                  const throwDirt = {
                    name: "Throw Dirt",
                    desc: "Make a called shot to a targets eyes with a fist full of dirt in an attempt to blind them.",
                    save: {
                      save_bonus: getStatMod(e.dexterity),
                      desc: "or go blind for 1d4 - 1 rounds.",
                      instructions: "Roll a dexterity save vs",
                      disadvantage: false
                    }
                  }

                  const d100 = Math.floor(Math.random() * 100) + 1;
                  console.log('==============================================================================================');
                  if (d100 < 16 && newEnemy.actions.length > 1) { newEnemy.actions.pop() };
                  if (d100 > 95) {newEnemy.actions.push(net);};
                  if (e.strength > 12 && d100 > 40) {newEnemy.actions.push(shove);};
                  if (e.alignment.indexOf('evil') !== -1 && d100 < 5) {newEnemy.actions.push(pokeEye);};
                  if (newEnemy.enemyName === "Thug" && d100 < 10) {newEnemy.actions.push(throwDirt);};
                }

                // console.log(newEnemy);

                devEncounter.encounter.enemies.push(newEnemy);
                counter++;

                if (enemies.length === counter) {
                  // Sort by initiative roll.
                  if (devEncounter.encounter.enemies.length > 1) {
                    devEncounter.encounter.enemies = devEncounter.encounter.enemies.sort(function (a, b) { return b.initiative - a.initiative; })
                  };
                  res.json(devEncounter);
                  console.log("Success! Sending Encounter back to front end.");
                };
              }).catch(error => {
                res.json({
                  msg: "Unable to build encounter",
                  err: error,
                })
              });
          });
        });
      }

      // STEP 5: Shell function for all the callbacks. Currently there is just 1.
      async function asyncCall() {
        await buildCallback();
      };

      // STEP 6: Call the function and wait.
      asyncCall();

    })
    .catch(err => {
      console.log("failed api call");
      console.log(err);
      res.status(422).json(err)
    });
});

// Read One
router.route("/:id").get((req, res) => {
  db.Enemy.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
