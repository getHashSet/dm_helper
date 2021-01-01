const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enemySchema = new Schema({
    enemyName: { type: String, required: true },
    ac: { type: Number, required: false },
    cr: { type: Number, required: false },
    hitDice: { type: String, required: true },
    movement: { type: Array, required: false },
    stats: { type: Object, required: false },
    pageNumber: { type: String, required: false },
    actionsNumber: { type: Number, required: false },
    actions: { type: Array, required: false }, // see actions schema
    date: { type: Date, default: Date.now }
});

const Enemy = mongoose.model("Enemy", enemySchema);

module.exports = Enemy;