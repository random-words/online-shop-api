const express = require("express");
const router = express.Router();
const { itemController } = require("../controllers");

router.get("/", itemController.findAll);

module.exports = router;
