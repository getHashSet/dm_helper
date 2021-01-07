const router = require("express").Router();
const db = require("../models");

router.route("/").get(function(req, res) {

    db.Items
    .find({})
    .then(itemList => {
        console.log(itemList);
        console.log("=====");
        res.json({
            msg: "Return Items",
            items: itemList,
        });
    })
    .catch(err => {
        res.json({
            msg: "Error reaching database.",
        })
    })
});

router.route("/add").post(function(req, res){
    // Example req.body Data
    /*
        {
            token: "********",
            item: {
                name: "Bucket",
                cost: 8, 
                coin: "sp", // gp, sp, cp
                desc: "A wooden bucket that is water tight.",
                category: ["adventure gear", "itemshop"] // these are categories they can be found it.
            }
        } 1g === 10s === 100cp
    */

   if (req.body.token !== process.env.UPLOADPASSWORD) {
        res.json({
            msg: "incorrect password",
            err: "incorrect password",
        })
    } else if (req.body.item === undefined || req.body.item === null) {
        res.json({
            msg: "Unable to identify encounter. Please check your work and try again.",
            err: "Did not write encounter to database.",
        });
    } else {

        const uncleanedItem = req.body.item;
        console.log(uncleanedItem);
        const cleanedItem = {
            name : uncleanedItem.name,
            cost : uncleanedItem.cost,
            coin : uncleanedItem.coin,
            desc : uncleanedItem.desc,
            category : uncleanedItem.category, 
        }

        // console.log(cleanedItem);
        
        db.Items
        .create(cleanedItem)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
        res.json({
            msg: "Uploaded"
        });
    };
    
});

module.exports = router;