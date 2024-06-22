const mongoose = require("mongoose");
const { Schema } = mongoose;
// const Goods = require("./goods");

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    basket: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: [],
      },
    ],
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", user);

module.exports = User;
