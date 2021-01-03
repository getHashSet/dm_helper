const router = require("express").Router();
const apiController = require('./api.controller');
const randomEncounterController = require('./random_encounter.controller');
const randomRumorController = require('./random_rumor.controller');
const randomNpc = require('./random_npc.controller');
const encounterTables = require('./encounter_table_controller');

router.use('/api/test', apiController);

router.use('/api/encounter', randomEncounterController);

router.use('/api/rumor', randomRumorController);

router.use('/api/npc', randomNpc);

router.use('/api/encounters', encounterTables)

module.exports = router;