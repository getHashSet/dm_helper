const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rumorSchema = new Schema({
    rumor: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Rumor = mongoose.model("Rumor", rumorSchema);

module.exports = Rumor;