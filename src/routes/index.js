const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.get("/", (req, res) => {
  res.send("Main Page");
});

router.get("/register", (req, res) => {
  res.send("Register Page");
});

router.post("/register", userController.registerUser);

router.get("/login", (req, res) => {
  res.send("Login page");
});

router.post("/login", userController.verify, (req, res) => {
  res.send("User's Main Page");
});

module.exports = router;
