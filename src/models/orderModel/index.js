import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  amount: Number,
  currency: String,
  receipt: String,
  orderId: String,  // Razorpay order ID
  paymentId: String, // Razorpay payment ID
  status: { type: String, default: "created" }, // created, paid, failed
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
