const mongoose = require("mongoose");
const { Schema } = mongoose;

const item = new Schema({
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
  comments: [
    {
      type: String,
    },
  ],
});

/**
 * Можливо, зробити так:
 */

// goods.methods.putLike = () => {};
// goods.methods.removeLike = () => {};

const Item = mongoose.model("Item", item);

module.exports = Item;
