const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rumorSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String },
    date: { type: Date, default: Date.now }
});

const Rumor = mongoose.model("Rumor", rumorSchema);

module.exports = Rumor;