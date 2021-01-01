const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
    type: { type: String, required: true }, // attack, item, spell, passive
    actionType: { type: String, required: false }, // action, bonus action, passive, reaction.
    actionName: { type: String, required: false }, // defaults to "Action"
    damageDice: { type: String, required: true }, // "3d10"
    damageMod: { type: String, required: false }, // default is "STR" but can be "STR" "DEX" "finess"
    hitMod: { type: Number, required: false }, // default is 2
    description: { type: String, required: true }, // "An attack that does 3d10 + 0 damage. +2 to hit."
    charges: { type: Number, required: false }, // default is 512.
    date: { type: Date, default: Date.now }
});

const Action = mongoose.model("Action", enemySchema);

module.exports = Action;