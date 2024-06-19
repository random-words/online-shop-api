const { itemService } = require("../services");

// async function putForSale(req, res, next) {
//   const data = req.body;
//   try {
//     const item = await itemService.putForSale(data);
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         item,
//       },
//     });
//     return item;
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

async function findAll(req, res, next) {
  const options = req.query;
  try {
    const items = await itemService.findAll(options);
    res.json({
      status: "success",
      code: 200,
      data: {
        items,
      },
    });
    return items;
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function findById(req, res, next) {
  const { id } = req.params;
  try {
    const item = await itemService.findById(id);
    if (item) {
      res.json({
        status: "success",
        code: 200,
        data: {
          item,
        },
      });
      return item;
    }
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Cannot find item with id: ${id}`,
      data: "Not Found",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function findByName(req, res, next) {
  const name = req.body;
  try {
    const items = itemService.findByName(name);
    if (items) {
      res.json({
        status: "success",
        code: 200,
        data: {
          items,
        },
      });
      return items;
    }
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Cannot find item with id: ${id}`,
      data: "Not Found",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// async function update(req, res, next) {
//   const { id } = req.params;
//   try {
//     const itemToFind = await itemService.findById(id);
//     if (itemToFind) {
//       const updatedItem = await itemService.update(id, data);
//       res.json({
//         status: "success",
//         code: 200,
//         data: {
//           updatedItem,
//         },
//       });
//       return updatedItem;
//     }
//     res.status(404).json({
//       status: "error",
//       code: 404,
//       message: `Cannot find item with id: ${id}`,
//       data: "Not Found",
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// async function removeFromSale(req, res, next) {
//   const { id } = req.params;
//   try {
//     const itemToRemove = await itemService.findById(id);
//     if (itemToRemove) {
//       const deletedItem = await itemService.removeFromSale(id);
//       res.json({
//         status: "success",
//         code: 200,
//         data: {
//           deletedItem,
//         },
//       });
//       return deletedItem;
//     }
//     res.status(404).json({
//       status: "error",
//       code: 404,
//       message: `Cannot find item with id: ${id}`,
//       data: "Not Found",
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

module.exports = {
  // putForSale,
  findAll,
  findById,
  findByName,
  // update,
  // removeFromSale,
};
