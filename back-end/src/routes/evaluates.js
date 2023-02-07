const express = require("express");
const router = express.Router();
const evaluateController = require("../controllers/evaluates");
const { verify } = require("../../utils/verify");

router.get(
  "/:idProduct/product",
  evaluateController.getListEvaluateByProductId
);

router.post("/", verify, evaluateController.postEvaluateByProductId);

module.exports = router;
