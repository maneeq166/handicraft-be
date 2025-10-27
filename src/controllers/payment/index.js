const {asyncHandler} = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const {
  createPaymentOrder,
  verifyPayment,
} = require("../../services/payment/index");

exports.handleCreateOrder = asyncHandler(async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  const result = await createPaymentOrder(userId, products, totalAmount);
  const { message, data, statusCode } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleVerifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const result = await verifyPayment(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  const { message, data, statusCode } = result;

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
