const mongoose = require("mongoose");
const { Schema } = mongoose;

const goods = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [String],
});

/**
 * Можливо, зробити так:
 */

goods.methods.putLike = () => {};
goods.methods.removeLike = () => {};

const Goods = mongoose.model("Goods", goods);

module.exports = Goods;
