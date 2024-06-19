const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

async function verify(req, res, next) {
  const { username, password } = req.body;
  try {
    const isVerified = userController.verify({ username, password });
    if (isVerified) {
      next();
      return;
    }
    res.json({
      status: "error",
      code: 400,
      message: "Data Entered Wrong",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

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

router.post("/login", verify, (req, res) => {
  res.send("User's Main Page");
});

module.exports = router;
