const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { verify } = require("../../utils/verify");

// admin
router.get("/admin", verify, productController.getListProductAdmin);
router.post("/admin", verify, productController.postProductAdmin);
router.put("/admin", verify, productController.putProductByIdAdmin);
router.delete(
  "/admin/:idProduct",
  verify,
  productController.deleteProductByIdAdmin
);

router.post(
  "/admin/delete-multiple-product",
  verify,
  productController.deleteMultipleProductByIdAdmin
);

router.get("/", productController.getListProduct);
router.get("/detail/:id", productController.getDetailProduct);
router.get(
  "/similar-by-category",
  productController.getListProductByCategoryId
);
router.get("/catalog", productController.getListProductBySearch);

module.exports = router;
