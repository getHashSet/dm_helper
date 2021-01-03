const router = require("express").Router();
const db = require("../models");

// Read All
router.route("/").get(function(req, res){
    console.log('starting');
    
    db.Encounters
        .find({})
        .then(dbModel => {
            console.log("returned");
            console.log(dbModel)
            res.json(dbModel)
            
        })
        .catch(err => res.status(422).json(err));
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