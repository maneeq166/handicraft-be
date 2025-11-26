const crypto = require("crypto");
const razorpay = require("../../config/razorpay");
const { createOrder, updateOrderPaymentDetails, getUser, getOrder, deleteOrder } = require("../../repositories/payment/index");
const CC = require("currency-converter-lt");
const Product = require("../../models/productModel/index");


exports.createPaymentOrder = async (userId, products) => {
  try {
    if (!userId || !products || products.length === 0) {
      return { data: null, statusCode: 400, message: "Missing required fields" };
    }

    let totalAmountUSD = 0;

    for (const item of products) {
const productId =
  item.product ||
  item.productId ||
  (typeof item === "string" ? item : null);

if (!productId) {
  return { statusCode: 400, message: "Invalid product ID" };
}

const productData = await Product.findById(productId);
      if (!productData) {
        return { data: null, statusCode: 400, message: "Product not found" };
      }

      if (!productData.netWeight) {
        return { data: null, statusCode: 400, message: "Product missing netWeight" };
      }

      const weight = Number(productData.netWeight);
      const quantity = Number(item.quantity) || 1;

      totalAmountUSD += weight * quantity;
    }

    if (isNaN(totalAmountUSD) || totalAmountUSD <= 0) {
      return { data: null, statusCode: 400, message: "Invalid total amount" };
    }

    const cc = new CC({ from: "USD", to: "INR" });
    let liveRate = 88.92;

    try {
      liveRate = await cc.convert(1);
    } catch (err) {}

    const totalAmountINR = Math.round(totalAmountUSD * liveRate);

    if (isNaN(totalAmountINR) || totalAmountINR <= 0) {
      return { data: null, statusCode: 400, message: "Invalid INR amount" };
    }

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

  } catch (error) {
    console.error("PAYMENT ORDER ERROR >>>", error);
    return { data: null, statusCode: 500, message: error.message };
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
