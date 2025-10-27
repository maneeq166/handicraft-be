const Order = require("../../models/orderModel/index.js");

exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

exports.updateOrderPaymentDetails = async (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  status
) => {
  const order = await Order.findOneAndUpdate(
    { razorpayOrderId },
    {
      razorpayPaymentId,
      razorpaySignature,
      paymentStatus: status,
    },
    { new: true }
  );
  return order;
};
