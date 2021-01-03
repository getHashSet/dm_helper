const router = require("express").Router();
const db = require("../models");

// Read All
router.route("/").get(function(req, res){

    // STEP 1: return all random encounters where dificulty is req.body.params.cr && location is req.body.params.location;
    // STEP 2: encounter = return[Math.random(Math.floor() * return.length))];
    // STEP 3: return encounter.

    db.Encounters
        .find({})
        .then(dbModel => {
            console.log("returned");
            console.log(dbModel)
            res.json(dbModel)
            
        })
        .catch(err => res.status(422).json(err));
});

// POST ALL
router.route("/").post(function(req, res) {

    console.log("Hit route for POST ALL");

    const location = req.body.location;
    const cr = req.body.cr;

    res.json({
        msg: `Find all where location is ${location} && cr is ${cr}`
    });

});

// // Create
// router.route("/").post((req, res) => {
//     db.Book
//         .create(req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// });

// // Read One
// router.route("/:id").get((req, res) => {
//     db.Book
//         .findById(req.params.id)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// })

// // Update 
// router.route("/:id").put((req, res) => {
//     db.Book
//         .findOneAndUpdate({ _id: req.params.id }, req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// })

// // Delete
// router.route("/:id").delete((req, res) => {
//     db.Book
//         .findById({ _id: req.params.id })
//         .then(dbModel => dbModel.remove())
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// });

module.exports = router;