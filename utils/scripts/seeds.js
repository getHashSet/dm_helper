const mongoose = require("mongoose");
const db = require("../../models");

// This file empties the collections

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/tabletopsquire" );

console.log(" ======= <SEED> =======");
db.Enemy
.deleteMany({})
.then(() => db.Enemy.collection.insertMany(seed_enemy))
.then(data => {
  console.log(`SEEDING ENEMY COLLECTION/TABLE: ${data.result.n} enemies seeded.`);

  //   NEXT SEED   //
  db.Action
  .deleteMany({})
  .then(() => db.Partners.collection.insertMany(seed_action))
  .then(data => {
    console.log(`SEEDING ACTION COLLECTION/TABLE: ${data.result.n} actions seeded.`);
  });

})
.catch(err => {
  console.log(" ======= !!! SEED FAILED !!! =======");
  console.error(err);
  process.exit(1);
}).finally(data => {
  console.log(" ======= </SEED> =======");
});