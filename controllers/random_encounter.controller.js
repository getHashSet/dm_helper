const router = require("express").Router();
const db = require("../models");

// Read All
router.route("/").get(function(req, res){
    console.log(req.query)
    db.Enemy
        .find()
        .sort({ date: -1 })
        .then(dbModel => {
            console.log(dbModel)
            res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
});

// Read One
router.route("/:id").get((req, res) => {
    db.Enemy
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;