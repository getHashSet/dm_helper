const seed_encounters = [
    {
        desc: "You hear a sound along the tree line. Something is shuffling around the bushes.",
        info: "As your players aproach the thick trees and bushes they see a heaping mound of fur. An owl bear eating berries! DC 12 to see the owlbear or be surprised.",
        enemies: ["owlbear"],
        cr: 3,
        location: "woods",
        difficulty: "easy"
      },
      {
        desc: "You can smell smoke on the air. You're stand down wind from a campfire.",
        info: "If players aproach the campfire they see three orcs sitting around a camp fire cooking some sort of beast. Sneak DC: 17. Passive DC to see wolves is 15.",
        enemies: ["orc","orc","orc","wolf", "wolf"],
        cr: 2,
        location: "woods",
        difficulty: "easy"
      },
      {
        desc: "As you walk you nearly trip over a clump of loose dirt. To your surprise there are coins mixed in with the mound.",
        info: "If the players dig up the dirt they find 5d100 silver pieces of the 900 or so burried in the dirt. If they collect more than 200 they will be followed by a green dragon. If the dragon feels he can take a party member from behind and drag them into the woods; he will. If HP goes below half the dragon flees.",
        enemies: ["young-green-dragon"],
        cr: 5,
        location: "woods",
        difficulty: "hard"
      }
]

module.exports = seed_encounters;