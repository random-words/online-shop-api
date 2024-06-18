const { userService } = require("../services");

async function registerUser(req, res, next) {
  const data = req.body;
  try {
    const user = await userService.registerUser(data);
    res.json({
      status: "success",
      code: 200,
      data: {
        user,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function verify(verificationData) {
  const username = await userService.findByData(verificationData.username);
  const password = await userService.findByData(verificationData.password);

  if (username && password) {
    return true;
  }
  return false;
}

async function findAll(req, res, next) {
  const options = req.query;
  try {
    const users = await userService.findAll(options);
    res.json({
      status: "success",
      code: 200,
      data: {
        users,
      },
    });
    return users;
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function findById(req, res, next) {
  const { id } = req.params;
  try {
    const user = await userService.findById(id);
    if (user) {
      res.json({
        status: "success",
        code: 200,
        data: {
          user,
        },
      });
      return user;
    }
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Cannot find user with id: ${id}`,
      data: "Not Found",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function update(req, res, next) {
  const { id } = req.params;
  try {
    const userToFind = await userService.findById(id);
    if (userToFind) {
      const updatedUser = await userService.update(id, data);
      res.json({
        status: "success",
        code: 200,
        data: {
          updatedUser,
        },
      });
      return updatedUser;
    }
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Cannot find user with id: ${id}`,
      data: "Not Found",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    const userToDelete = await userService.findById(id);
    if (userToDelete) {
      const deletedUser = await userService.deleteUser(id);
      res.json({
        status: "success",
        code: 200,
        data: {
          deletedUser,
        },
      });
      return deletedUser;
    }
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Cannot find user with id: ${id}`,
      data: "Not Found",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function addToBasket(req, res, next) {
  await userService.addToBasket();
  console.log("ok");
}

module.exports = {
  registerUser,
  verify,
  findAll,
  findById,
  update,
  deleteUser,
  addToBasket,
};
