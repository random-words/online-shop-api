const { Item } = require("../models");

async function putForSale(data) {
  return Item.create(data);
}

async function findAll({ limit, skip }) {
  return Item.find()
    .populate("owner", ["username", "firstName", "lastName"])
    .limit(limit)
    .skip(skip);
}

async function findById(id) {
  return Item.findById(id).populate("owner", [
    "username",
    "firstName",
    "lastName",
  ]);
}

async function findByName(name) {
  return Item.find({ name }).populate("owner", [
    "username",
    "firstName",
    "lastName",
  ]);
}

async function update(id, data) {
  return Item.findByIdAndUpdate(id, data);
}

async function removeFromSale(id) {
  return Item.findByIdAndDelete(id);
}

module.exports = {
  putForSale,
  findAll,
  findById,
  findByName,
  update,
  removeFromSale,
};
