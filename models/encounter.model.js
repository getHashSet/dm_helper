const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encounterSchema = new Schema({
    desc: { type: String, required: true },
    info: { type: String, required: true },
    enemies: { type: Array },
    cr: { type: Number, required: true },
    location: { type: String, required: true },
    difficulty: { type: String, required: false},
    date: { type: Date, default: Date.now }
});

const Encounters = mongoose.model("encounters", encounterSchema);

module.exports = Encounters;