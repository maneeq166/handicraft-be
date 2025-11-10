const crypto = require("crypto");
const razorpay = require("../../config/razorpay");
const { createOrder, updateOrderPaymentDetails, getUser, getOrder, deleteOrder } = require("../../repositories/payment/index");


// exports.createPaymentOrder = async (userId, products, totalAmount) => {
//   if (!userId || !products || !totalAmount) {
//     return { data: null, statusCode: 400, message: "Missing required fields" };
//   }

//   const options = {
//     amount: totalAmount * 100, // in paise
//     currency: "INR",
//     receipt: `receipt_${Date.now()}`,
//   };

//   const razorpayOrder = await razorpay.orders.create(options);

//   const orderData = {
//     user: userId,
//     products,
//     totalAmount,
//     razorpayOrderId: razorpayOrder.id,
//     paymentStatus: "pending",
//   };

//   const savedOrder = await createOrder(orderData);

//   return {
//     data: { razorpayOrder, savedOrder },
//     statusCode: 200,
//     message: "Razorpay order created",
//   };
// };



exports.createPaymentOrder = async (userId, products, totalAmountUSD) => {
  if (!userId || !products || !totalAmountUSD) {
    return { data: null, statusCode: 400, message: "Missing required fields" };
  }

  const USD_TO_INR = 88.92;
  const totalAmountINR = Math.round(totalAmountUSD * USD_TO_INR);

  const options = {
    amount: totalAmountINR * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const razorpayOrder = await razorpay.orders.create(options);

  const orderData = {
    user: userId,
    products,
    totalAmountINR,
    totalAmountUSD,
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

exports.getAllUsersOrders = async (user) =>{
  if(!user){
    return{
      data:null,
      statusCode:400,
      message:"Required fields are missing"
    }
  }

  const users = await getUser(user);

  return {
    data:users,
    statusCode:200,
    message:"All user"
  }

}


exports.getAllOrders = async (products) =>{
  // if(!products){
  //   return{
  //     data:null,
  //     statusCode:400,
  //     message:"Required fields are missing"
  //   }
  // }

  const orders = await getOrder(products);

  return {
    data:orders,
    statusCode:200,
    message:"All Orders"
  }
}


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


exports.DeleteOrder = async (id) =>{
  if(!id){
    return{
      data:null,
      statusCode:400,
      message:"Required fields are missing"
    }
  }

  const deletedOrder = await deleteOrder(id);

  return {
    data:deletedOrder,
    statusCode:200,
    message:"Order deleted"
  }
}