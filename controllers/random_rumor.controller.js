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

    if (req.body.password !== process.env.UPLOADPASSWORD) {
        res.json({
            msg: "incorrect token",
            err: "incorrect token",
        })
    } else if (req.body.rumor === undefined || req.body.rumor === null || req.body.rumor.length < 4) {
        res.json({
            msg: "Unable to upload rumor.",
            err: "Did not write rumor to database.",
        });
    } else {
        db.Rumors
        .create(req.body)
        .then(dbModel => res.json( { msg: "uploaded rumor" } ))
        .catch(err => res.status(422).json(err));
    };


});

module.exports = router;