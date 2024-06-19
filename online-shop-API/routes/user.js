const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.get("/", (req, res) => {
  res.send("User's Main Page");
});

router.get("/all", userController.findAll);

router.get("/:id", userController.findById);

router.post("/put-for-sale", userController.putForSale);

router.delete("/:id/remove-from-sale", userController.removeFromSale);

router.post("/:id/add-to-basket", userController.addToBasket);

router.delete("/:id/remove-from-basket", userController.removeFromBasket);

module.exports = router;
