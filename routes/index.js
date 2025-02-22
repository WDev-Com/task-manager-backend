const express = require("express");
const router = express.Router();
const taskroute = require("./taskroute");

router.use("/tasks", taskroute);

module.exports = router;
