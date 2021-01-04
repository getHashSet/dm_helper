const router = require("express").Router();

const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const d = (num) => {
    return Math.floor(Math.random() * num) + 1;
}

const heldItem = [
    'healing potion',
    'small ruby',
    'copper key',
    'silver key',
    'gold key',
    'a set of wood dice',
    'bar of soap',
    'wooden shield',
    'blue berries',
    'a pipe',
    'thieves tools',
    'a bucket',
    'a small lock',
    `${d(12) + 3} arrows`,
    `${d(6) + 1} bolts`,
    'herbs',
    'a healers kit',
    'an iron lock',
    'a small box',
]

const npcName = [
    "Binks",
    "The Tangerine",
    "Stuffins",
    "Brindle Bellshout III",
    "Click",
    "Sneaky Pete",
    "Sneakier Pete",
    "The Five Eye'd Crow",
    "Baron",
    "Frin",
    "Biggs",
    "Wedge",
    "Cid",
    "Hope",
    "Lurkins",
    "Marlissa",
    "Franklin",
    "Blinkin",
    "Abe",
    "Abe Blinkin",
    "Flin",
    "Dimple",
    "Emily",
    "June",
    "May",
    "Ken",
    "Toa",
    "Lowe",
    "Hans",
    "Gong",
    "Gort",
    "Brightbeard",
    "Darkbeard",
    "Lance",
    "Krusk",
    "Henk",
    "Mitch",
    "Ovak",
    "Yorgin",
    "The Drow",
    "Beren",
    "Breena",
    "Caramip",
    "Carlin",
    "Treasure",
    "Orryn Moonsong",
    "Frug Folkor",
    "Flicker Fenlurker",
    "Flick",
    "Glim Glum",
    "Sean Schnarr",
    "Ella Rubysong",
    "Roywyn",
    "Alvyn",
    "Akra",
    "Bri",
    "Balasar Blackwater",
    "Donaar Janes",
    "Nadarr",
    "Nala",
    "Perra",
    "Rune",
    "Kriv",
    "Morty",
    "Rick",
    "Dorn Evendur",
    "Ander Moore",
    "Slick",
    "Navarra",
    "June",
    "Orel Chen",
    "Alton Brushgather",
    "Andry Bree Tealeaf",
    "Milo Thorngate",
    "Silent Sam",
    "Lyle Bloomfoot",
    "Mustafa Far Mowy",
    "Reed Roscoe",
    "Jillian Kurth",
    "Marvin Highhill",
    "Cleric James",
    "Trever Goodbarrel",
    "Oak",
    "William Dole",
    "Swampy"
];

const hairColor = [
    "red",
    "black",
    "blond",
    "braided"
]

const hairMod = [
    "short",
    "long",
    "well groomed",
    "frizzy"
]

const identifier = [
    "a half orc,",
    "the dragon slayer,",
    "The bear king, ",
    "is a half ogre wearing a nice tunic",
    "a slender elf standing about 4 feet tall",
    "a rather tall half elf",
    "the tinker",
    "a tailor looking for work",
    `is a dwarf with a ${random(hairMod)} ${random(hairColor)} beard`,
    'is dressed like a black smith',
    'is a teacher',
    'is a human with a smug look on thier face',
    "is a Kenku missing a fist full of feathers on their forhead",
    "also known as the wistling Kenku, ",
    "is a halfling with a fist full of feathers in their left hand",
    "is a chearful stable hand,",
    "is a drunk pixie",
    "is a human",
    "the happy bard is",
    "is a town guard,",
    "is a frustrated looking half elf, ",
    "is a cloaked figure with their hood up, ",
    "an old man with incredibly long eyebrows",
];

const insterments = [
    'pipe',
    'harp',
    'lute'
]

const modifier = [ // perks and flaws
    'and a bad attitude',
    'currently eating an apple',
    'nervously looking around while stuffing something into their side bag',
    'holding a dirty old book',
    'who has ink stains all over their right hands',
    'currently picking at their nails with a dagger',
    'blinking as if they have something in their eye',
    'stairing into the void',
    'focused on a small wooden puzzle in their hand while biting their lip and rubbing their head with the other',
    'walking quickly with their hand over their side pouch',
    'humming to themselves',
    `and is currently is playing the ${random(insterments)}`,
    ', and doesnt believe in magic',
    ", and is so hairy they could pass for a bugbear",
    "smoking a pipe",
    "selling flowers",
    "sharpening a wood axe",
    "rubbing their forhead",
    "and is currently is playing with a pet rat",
    "holding a drink",
    `and is currently is playing with a ${random(heldItem)}`,
    `counting a stack of about ${d(100)} coins`,
    `and is sitting in front of ${d(4) + 1} empty mugs of mead`,
    `holding a fist full of black pearls`,
    `holding a ${random(heldItem)} in their right hand`,
];

const heldMonies = () => {
    const coins = [
        "gold",
        "silver",
        "silver",
        "copper",
        "copper",
        "copper"
    ];

    const totals = [
        `${d(4)} ${random(coins)}`,
        `${d(6)} ${random(coins)}`,
        `${d(8)} ${random(coins)}`,
        `${d(10)} ${random(coins)}`,
        `${d(12)} ${random(coins)}`,
    ];

    const money = random(100) > 80 ? "empty" : `${random(totals)}`;

    return money;
}

const weapons = [
    'Dagger',
    'Shortbow',
    'Longsword',
    'Spear',
    'Crossbow',
    'Short Sword',
    'Mace',
]

const randomPicker = () => {
    return `${random(identifier)} ${random(modifier)}.`;
}

router.route("/").get(function(req, res){
    res.json({
        desc: randomPicker(),
        name: random(npcName),
        passivePerception: `${d(10) + 8}`,
        weapon: random(weapons),
        coin: heldMonies(),
        item: random(heldItem),
    });
});

module.exports = router;