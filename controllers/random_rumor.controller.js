const router = require("express").Router();
const db = require("../models");
const axios = require('axios');

const randomPicker = (rumors) => {
    const d100 = Math.floor(Math.random() * rumors.length);
    return rumors[d100];
}

router.route("/").get(function(req, res){

    db.Rumors
    .find({})
    .then(data => {
        res.json({
            rumor: randomPicker(data).rumor
        });
    })
    .catch(err => {
        res.send("Error")
        console.log(err);
    });
});

router.route("/upload").post((req, res) => {
    db.Rumors
    .create(req.body)
    .then(dbModel => res.json( { msg: "uploaded rumor" } ))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
