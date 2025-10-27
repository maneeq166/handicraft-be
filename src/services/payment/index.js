const crypto = require("crypto");
const razorpay = require("../../config/razorpay");
const { createOrder, updateOrderPaymentDetails } = require("../../repositories/payment/index");


exports.createPaymentOrder = async (userId, products, totalAmount) => {
  if (!userId || !products || !totalAmount) {
    return { data: null, statusCode: 400, message: "Missing required fields" };
  }

  const options = {
    amount: totalAmount * 100, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const razorpayOrder = await razorpay.orders.create(options);

  const orderData = {
    user: userId,
    products,
    totalAmount,
    razorpayOrderId: razorpayOrder.id,
    paymentStatus: "pending",
  };

  const savedOrder = await createOrder(orderData);

  return {
    data: { razorpayOrder, savedOrder },
    statusCode: 200,
    message: "Razorpay order created",
  };
};

exports.verifyPayment = async (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return { data: null, statusCode: 400, message: "Missing payment details" };
  }

  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET )
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpaySignature;

  const updatedOrder = await updateOrderPaymentDetails(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    isValid ? "paid" : "failed"
  );

  if (!isValid) {
    return {
      data: updatedOrder,
      statusCode: 400,
      message: "Invalid payment signature",
    };
  }

  return {
    data: updatedOrder,
    statusCode: 200,
    message: "Payment verified successfully",
  };
};
