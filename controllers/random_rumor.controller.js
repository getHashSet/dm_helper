const router = require("express").Router();
const db = require("../models");
const axios = require('axios');

const rumors = [
    "Dont hunt in south forest. Druids like to turn into deer and prance around down there.",
    "The kings daughters missin' 'er arm. A dragon took it I 'ear.",
    "Across the pub a Wizard looks you right in the eye with a puzzled look on his face. After a moment the Wizard sneezes and vanishes into a puff of dust.",
    "You know, they say the island the keep sits on is actually sacred ground by the orcs. Hell, who knows what lies under our feet.",
    "Trolls hate bells.",
    "The Dwarf up east have to mine with wooden tools. They says iron weights ten times in the mines!",
    "I came across a huge stash of gold coins just burried along the edge of the forest. Took me a hour just to toss through the dirt for all the coins.",
    "There are ruins to an evil temple down in the fens below the falls. The lizard-skins built it. The old Commander cleaned out that nest himself! Gawd bless his soul. I wonder whatever happened to 'em.",
    "The way I hear it, a group of young soldiers recently discovered a vein of gold in the draw nearbouts on up the pass. That's all hush hush mind you.",
    "No outsiders have ever entered those Mines and returned to tell the tale. Sept me of course.",
    "Them Bugbears hate water! Splash em and they'll just run off.",
    "They say when a Beholder sleeps it's dreams come true. Dark magic if ye' ask me.",
    "If you see a rat, kill it! Filthy buggers been snatching coin off the table.",
    "Theres an old wizard up at the summit of the mountain. Freezin' up there and not a soul for miles. What's 'e up to I wonder...",
    "The dukes son actually went missing some time back. They say the Queens wrath is somethin' ta be feared. So much so they'd just up and swapped the lad before she could find out.",
    "Somethin is funny about that there bar keep",
]

const randomPicker = (rumors) => {
    const d100 = Math.floor(Math.random() * rumors.length);
    return rumors[d100];
}

router.route("/").post(function(req, res){
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

module.exports = router;