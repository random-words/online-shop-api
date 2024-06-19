const { User } = require("./schemas");

async function registerUser(data) {
  return User.create(data);
}

async function findAll({ limit, skip }) {
  return User.find()
    .populate("basket", ["name", "likes", "comments"])
    .limit(limit)
    .skip(skip);
}

async function findById(id) {
  return User.findById(id).populate("basket", ["name", "likes", "comments"]);
}

async function findByData(data) {
  return User.findOne(data);
}

async function update(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  registerUser,
  findAll,
  findById,
  findByData,
  update,
  deleteUser,
};
