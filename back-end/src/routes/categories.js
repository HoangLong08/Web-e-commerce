const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories");
const { verify } = require("../../utils/verify");

// admin
router.get("/admin", verify, categoryController.getListCategoryAdmin);
router.post("/admin", verify, categoryController.postCategoryAdmin);
router.put("/admin", verify, categoryController.putCategoryAdmin);
router.put(
  "/admin/update-order-category",
  verify,
  categoryController.putOrderCategoryAdmin
);
router.delete(
  "/admin/:idCategory",
  verify,
  categoryController.deleteCategoryAdmin
);

//user
router.get("/", categoryController.getDetailCategory);

module.exports = router;
