const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu");
const { verify } = require("../../utils/verify");

router.get("/", menuController.getMenuAdmin);

// admin
router.post("/admin", verify, menuController.postItemMenuAdmin);

module.exports = router;
