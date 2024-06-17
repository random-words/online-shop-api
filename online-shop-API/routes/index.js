const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "YES" });
});

router.post("/register", (req, res) => {});

module.exports = router;
