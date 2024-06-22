const { userService, itemService } = require("../services");

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

async function verify(req, res, next) {
  const { username, password } = req.body;
  try {
    const usernameData = await userService.findByData(username);
    const passwordData = await userService.findByData(password);

    if (usernameData && passwordData) {
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

// async function login(req, res, next) {}

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

async function putForSale(req, res, next) {
  const item = req.body;
  try {
    const itemForSale = await itemService.putForSale(item);
    res.json({
      status: "success",
      code: 200,
      data: {
        itemForSale,
      },
    });
    return itemForSale;
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function removeFromSale(req, res, next) {
  const { id } = req.params;
  const { itemId } = req.body;
  try {
    const user = await userService.findById(id);
    const item = await itemService.findById(itemId);

    if (item.owner.id === user.id) {
      const removedItem = await itemService.removeFromSale(itemId);
      res.json({
        status: "success",
        code: 200,
        data: {
          removedItem,
        },
      });
      return;
    }
    res.json({
      status: "Error",
      message: "Something Went Wrong",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function addToBasket(req, res, next) {
  const { id } = req.params;
  const { itemId } = req.body;
  try {
    const user = await userService.findById(id);
    const item = await itemService.findById(itemId);
    if (item.owner.id === user.id) {
      res.json({
        message: "You cannot add you own item",
      });
      return;
    }
    if (item) {
      await userService.update(id, { $push: { basket: item } });
      res.json({
        status: "success",
        code: 200,
        data: {
          item,
        },
      });
      return item;
    }
    res.json({
      status: "Error",
      message: "Cannot find this item",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function removeFromBasket(req, res, next) {
  const { id } = req.params;
  const { itemId } = req.body;
  try {
    const user = await userService.findById(id);
    const item = await itemService.findById(itemId);
    const isPresent = user.basket.find((el) => el.id === item.id);

    if (isPresent) {
      const updatedUser = await userService.update(id, {
        $pull: { basket: item.id },
      });
      res.json({
        status: "success",
        code: 200,
        data: {
          updatedUser,
        },
      });
      return updatedUser;
    }
    res.json({
      status: "Error",
      message: "You Don't Have This Item In Basket",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  registerUser,
  verify,
  findAll,
  findById,
  update,
  deleteUser,
  putForSale,
  removeFromSale,
  addToBasket,
  removeFromBasket,
};
