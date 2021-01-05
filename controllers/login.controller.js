const router = require("express").Router();
require("dotenv").config();

router.route("/").post(function(req, res){
    try {
        if ( req.body.password === process.env.UPLOADPASSWORD ){
            res.json({
                msg: "I like cake",
            });
        } else {
            res.json({
                msg: "Not a fan of that " + req.body.userName,
            });
        }
    } catch (error) {
        res.json({
            err: "Something has gone wrong " + req.body.userName,
        });
    };
});

module.exports = router;