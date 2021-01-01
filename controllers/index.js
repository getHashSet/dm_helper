const router = require("express").Router();
const apiController = require('./api.controller');
const randomEncounterController = require('./random_encounter.controller');

router.use('/api/test', apiController);

router.use('/api/encounter', randomEncounterController);

module.exports = router;