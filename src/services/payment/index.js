const crypto = require("crypto");
const razorpay = require("../../config/razorpay");
const { createOrder, updateOrderPaymentDetails, getUser, getOrder, deleteOrder } = require("../../repositories/payment/index");
const CC = require("currency-converter-lt")

exports.createPaymentOrder = async (userId, products) => {
  try {
    if (!userId || !products || products.length === 0) {
      return { data: null, statusCode: 400, message: "Missing required fields" };
    }

    let totalAmountUSD = 0;

    for (const item of products) {
      const productData = await Product.findById(item.product);
      if (!productData) {
        return { data: null, statusCode: 400, message: "Product not found" };
      }

      const weight = Number(productData.netWeight) || 0;
      const quantity = Number(item.quantity) || 1;

      totalAmountUSD += weight * quantity;
    }

    const cc = new CC({ from: "USD", to: "INR" });
    let liveRate;

    try {
      liveRate = await cc.convert(1);
    } catch (err) {
      liveRate = 88.92;
    }

    const totalAmountINR = Math.round(totalAmountUSD * liveRate);

    const options = {
      amount: totalAmountINR * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // THE REAL ERROR POINT – NOW SAFE
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

  } catch (err) {
    console.error("Payment Order Error →", err); 
    return {
      data: null,
      statusCode: 500,
      message: err.message || "Payment order failed",
    };
  }
};



exports.getAllUsersOrders = async (user) =>{


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
