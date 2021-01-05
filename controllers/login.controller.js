const router = require("express").Router();

router.route("/").post(function(req, res){
    try {
        if ( req.body.password === "cake" ){
            res.json({
                msg: "I like cake"
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