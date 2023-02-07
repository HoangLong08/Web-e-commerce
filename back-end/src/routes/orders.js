const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");
const { verify } = require("../../utils/verify");

// admin
router.get("/admin", verify, orderController.getListOrderAdmin);
// router.post("/admin", verify, orderController.postCategoryAdmin);
// router.put("/admin", verify, orderController.putCategoryAdmin);
// router.delete(
//   "/admin/:idCategory",
//   verify,
//   orderController.deleteCategoryAdmin
// );

//user
router.post("/", verify, orderController.addOrderByUserId);
router.get("/:idOrder", verify, orderController.getOrderById);
module.exports = router;
