const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brands");
const { verify } = require("../../utils/verify");

// admin
router.post("/admin", verify, brandController.postListBrandByIdCategoryAdmin);

module.exports = router;
