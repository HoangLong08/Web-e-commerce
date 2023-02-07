const express = require("express");
const router = express.Router();
const rsController = require("../controllers/rs");
const { verify } = require("../../utils/verify");

//user
router.get(
  "/similar-product-rating/:idUser",
  verify,
  rsController.getProductsRatingSimilar
);

module.exports = router;
