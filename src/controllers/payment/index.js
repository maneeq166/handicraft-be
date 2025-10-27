const ApiResponse = require("../../utils/apiResponse");
const {
  createPaymentOrder,
  verifyPayment,
} = require("../../services/payment/index");

exports.handleCreateOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    const result = await createPaymentOrder(userId, products, totalAmount);
    const { message, data, statusCode } = result;

    res.status(Number(statusCode) || 200).json(new ApiResponse(statusCode, data, message));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.handleVerifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const result = await verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    const { message, data, statusCode } = result;

    res.status(Number(statusCode) || 200).json(new ApiResponse(statusCode, data, message));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
