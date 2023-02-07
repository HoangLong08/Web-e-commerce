const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboards");
const { verify, isAdmin } = require("../../utils/verify");

// admin
router.get("/admin", verify, isAdmin, dashboardController.getDashboardAdmin);

module.exports = router;
