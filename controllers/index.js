const router = require("express").Router();
const exampleController = require("./example.controller");
const testController = require("./test");

router.use("/api/example", exampleController);

router.use("/test", testController);

module.exports = router;