const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    coin: { type: String, required: true },
    desc: { type: String, required: false },
    category: { type: Array, required: true },
    damage: { type: Object, required: false }, // { damage, properties, condition }
    date: { type: Date, default: Date.now }
});

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;