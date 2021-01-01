const router = require("express").Router();
const randomEncounterController = require('./random_encounter.controller');

router.use('/api/encounter', randomEncounterController);

module.exports = router;