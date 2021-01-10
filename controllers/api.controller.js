const router = require("express").Router();
// const authenticateUser = require("../utils/passport/authenticateUser")
const authenticateUser = require("../utils/passport/authenticateUser").authenticateUser;



router.route("/").get(authenticateUser, (req, res) => {
    res.send("Hello World");
});

// router.route('/test')
// .get(authenticateUser, (req, res) => {
//     res.json({
//         msg: "You are logged in",
//     })
// });

module.exports = router;