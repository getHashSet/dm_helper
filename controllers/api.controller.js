const router = require("express").Router();
const authenticateUser = require("../utils/passport/authenticateUser").authenticateUser;

router.route("/").get(authenticateUser, (req, res) => {
    res.send("Hello World");
});

module.exports = router;