const router = require("express").Router();
const apiController = require('./api.controller');
const randomEncounterController = require('./random_encounter.controller');
const randomRumorController = require('./random_rumor.controller');
const randomNpc = require('./random_npc.controller');
const uploadEncounterController = require('./upload_encounter.controller');
const loginController = require('./login.controller');
const itemController = require('./item_controller');

router.use('/api/test',             apiController);

router.use('/api/encounter',        randomEncounterController);

router.use('/api/encounters',       uploadEncounterController);

router.use('/api/rumor',            randomRumorController);

router.use('/api/npc',              randomNpc);

router.use('/login/attempt',        loginController);

router.use('/api/items',            itemController);

module.exports = router;