const mongoose = require("mongoose");
const db = require("../../models");
const seed_rumor = require("./seed_rumor");
const seed_encounters = require("./seed_encounter_tables");
require("dotenv").config();

// This file empties the collections

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/tabletopsquire"
// );

mongoose.connect(process.env.MONGODB_URI);

console.log(" ======= <SEED> =======");
db.Rumors.deleteMany({})
  .then(() => db.Rumors.collection.insertMany(seed_rumor))
  .then((data) => {
    console.log(
      `SEEDING RUMOR COLLECTION/TABLE: ${data.result.n} rumors seeded.`
    );
    db.Encounters.deleteMany({})
      .then(() => db.Encounters.collection.insertMany(seed_encounters))
      .then((data) => {
        console.log(
          `SEEDING ENCOUNTER COLLECTION/TABLE: ${data.result.n} encounters seeded.`
        );
        
        // ======== //
        //   EXIT   //
        // ======== //
        console.log(" ======= </SEED> =======");
        process.exit(0);
      });
  })
  .catch((err) => {
    console.log(" ======= !!! SEED FAILED !!! =======");
    console.error(err);
    process.exit(1);
  });
