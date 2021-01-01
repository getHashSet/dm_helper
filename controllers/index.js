const router = require("express").Router();
const apiController = require('./api.controller');
const randomEncounterController = require('./random_encounter.controller');
const randomRumorController = require('./random_rumor.controller');

router.use('/api/test', apiController);

router.use('/api/encounter', randomEncounterController);

router.use('/api/rumor', randomRumorController);

module.exports = router;