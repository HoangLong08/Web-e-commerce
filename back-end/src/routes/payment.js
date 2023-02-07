const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const { verify } = require("../../utils/verify");

// admin
router.post("/create-order", verify, paymentController.createPaymentIntent);
router.post(
  "/update-status",
  verify,
  paymentController.updateStatusOrderByOrderId
);
router.post("/create-payment", verify, paymentController.createPaymentOrder);
router.post("/", verify, paymentController.createOrderByUserId);
router.delete("/:idOrder", verify, paymentController.deleteOrderByOrderId);

module.exports = router;
