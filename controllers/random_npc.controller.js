const router = require("express").Router();

const npc = [
    "Binks",
    "The Tangerine",
    "Stuffins",
    "Brindle Bellshout III",
    "Click",
    "Sneaky Pete",
    "Sneakier Pete",
    "Five Eye'd Crow",
    "Baron",
    "Frin",
    "Biggs",
    "Wedge",
    "Cid"
]

const randomPicker = () => {
    const d100 = Math.floor(Math.random() * npc.length);
    return npc[d100];
}

router.route("/").get(function(req, res){
    res.json({
        npc: randomPicker()
    });
});

module.exports = router;