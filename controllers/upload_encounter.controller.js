const router = require("express").Router();
const db = require("../models");
const authenticateUser = require("../utils/passport/authenticateUser").authenticateUser;


// ======= //
// GET ALL //
// ======= //
router.route("/").get(function(req, res){
    db.Encounters
        .find({})
        .then(dbModel => {
            // console.log(dbModel)
            res.json(dbModel)
            
        })
        .catch(err => res.status(422).json(err));
});

// ============================ //
// POST FIND BY LOCATION AND CR //
// ============================ //
// router.route("/").post(function(req, res) {

//     const location = req.body.location ? req.body.location : "woods" ;
//     const cr = req.body.cr ? req.body.cr : "5";

//     db.Encounters
//         .find({ "cr": cr, "location": location })
//         .then(dbModel => {
//             // console.log(dbModel)
//             res.json(dbModel)
//         })
//         .catch(err => res.status(422).json(err));

// });

////////////
// Create //
////////////
router.route("/upload").post((req, res) => {
    // TODO: check to see if it already in the database to prevent duplicates.

    db.Encounters
    .create(req.body.encounter)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
    res.json({
        msg: "Uploaded"
    });

});

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