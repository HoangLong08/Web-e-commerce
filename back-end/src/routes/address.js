const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address");

// admin
router.get("/city", addressController.getAllCity);
router.get("/district", addressController.getListDistrictByIdCity);
router.get("/street", addressController.getListStreetByIdDistrict);

module.exports = router;
