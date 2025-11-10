const express = require("express");
const router = express.Router();
const {
  handleCreateOrder,
  handleVerifyPayment,
  handleGetAllOrders,
  handleGetUserOrder,
  handleOrderDeletion,
} = require("../../controllers/payment/index");

router
  .route("/order")
  .post(handleCreateOrder);


router.route("/get-orders").get(handleGetAllOrders);

router.route("/get-users").get(handleGetUserOrder);

router
  .route("/verify")
  .post(handleVerifyPayment);

router.route("/delete-order").delete(handleOrderDeletion);

module.exports = router;
