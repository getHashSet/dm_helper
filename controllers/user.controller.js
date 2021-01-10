const db = require("../models");
const router = require("express").Router();
const authenticateUser = require("../utils/passport/authenticateUser").authenticateUser;  //checks the incoming request to make sure the user object is valid
const passport = require('../utils/passport');

// /api/users routes to interact with users (employees)

// /api/users base route
router.route('/')
    .get(authenticateUser, (req, res) => {
        db.User.find({}, { "local.password": 0 }).sort({ firstName: 1, lastName: 1 })
            .then(dbRes => {
                // console.log(dbRes);
                res.json(dbRes);
            })
            .catch(err => {
                // console.log(err)
                res.status(500).json(err);
            })
    });


// add a new user to the db, existing user must be logged in to add a record
// logged in user must also be admin
router.route('/')
.post((req, res) => {
    const { username, password, firstName, lastName, role } = req.body;
        
        if (req.user.role != "admin") return res.status(401).json({ message: "You do not have sufficient privileges to add a user" });
        db.User.create({ local: { username, password }, firstName, lastName, role })
            .then(userRes => {

                if (!userRes) return res.status(400).json({ message: "User not successfully created" });
                res.json({
                    message: "User successfully created",
                    username: userRes.local.username,
                    role: userRes.role
                })
            })
            .catch(err => {
                // console.log(err)
                res.status(500).json(err)
            })
    });


// delete user from database if user sending request is an admin
router.route('/:id')
    .delete(authenticateUser, (req, res) => {
        const { id } = req.params;
        const { role } = req.user

        if (role !== "admin")
            return res.status(400).json({
                message: "Insufficient privileges do delete user",
                userId: id
            })

        db.User.findByIdAndDelete(id)
            .then(userRes => {
                // console.log(userRes);
                res.json({
                    message: "User successfully deleted",
                    userId: id
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    });


// update password for the currently logged in user
router.route('/:id/password')
    .put(authenticateUser, (req, res) => {
        const id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        // console.log(req.body);
        // console.log(req.user);
        db.User.findById(id).then(userRes => {
            if (!userRes) return res.status(404).json({ message: "User not found.  Can't change password." });

            if ((req.user.local.username != userRes.local.username) && (req.user.role != 'admin'))
                return res.status(401).json({
                    message: "You don't have sufficient privileges to change the password for another user.",
                    yourUserId: req.user.local.username,
                    theirUserId: id
                })

            db.User.findByIdAndUpdate(id, { $set: { "local.password": newPassword } }).then(updateRes => {
                updateRes.local.password = newPassword;
                updateRes.save();  //save it to trigger the password hashing
                res.json({ message: "Password successfully changed", user: req.user.local.username });
            }).catch(err => {
                res.status(500).json(err);
            })
        })
    });


module.exports = router;