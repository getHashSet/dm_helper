const router = require("express").Router();

router.route("/").get(function(req, res){
    res.send("Hello World");
});

module.exports = router;