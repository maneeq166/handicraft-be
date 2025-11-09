const express = require("express");
const router = express.Router();
const {
  handleCreateOrder,
  handleVerifyPayment,
} = require("../../controllers/payment/index");

router
  .route("/order")
  .post(handleCreateOrder);

router
  .route("/verify")
  .post(handleVerifyPayment);

module.exports = router;