const crypto = require("crypto");
const razorpay = require("../../config/razorpay");
const { createOrder, updateOrderPaymentDetails, getUser, getOrder, deleteOrder } = require("../../repositories/payment/index");
const CC = require("currency-converter-lt");
const Product = require("../../models/productModel/index");


exports.createPaymentOrder = async (userId, products, promoCode) => {
  try {
    if (!userId || !products || products.length === 0) {
      return { data: null, statusCode: 400, message: "Missing required fields" };
    }

    let totalAmountUSD = 0;
    let subtotalUSD = 0;     // item price only (used for promo)
    let shippingUSD = 0;

    for (const item of products) {
      const productId =
        item.product ||
        item.productId ||
        item._id ||
        (typeof item === "string" ? item : null);

      if (!productId) {
        return { data: null, statusCode: 400, message: "Invalid product ID" };
      }

      const productData = await Product.findById(productId);
      if (!productData) {
        return { data: null, statusCode: 400, message: "Product not found" };
      }

      if (!productData.netWeight || isNaN(productData.netWeight)) {
        return {
          data: null,
          statusCode: 400,
          message: `Product ${productData.productName} has invalid netWeight`,
        };
      }

      const weight = Number(productData.netWeight);
      const quantity = Number(item.quantity) || 1;
      const price = Number(productData.price) || 0;

      const itemCostUSD = price * quantity;         // product price
      const shippingCostUSD = weight * quantity * 1; // $1/kg shipping

      subtotalUSD += itemCostUSD;
      shippingUSD += shippingCostUSD;
    }

    // Calculate total without discount
    totalAmountUSD = subtotalUSD + shippingUSD;

    if (isNaN(totalAmountUSD) || totalAmountUSD <= 0) {
      return { data: null, statusCode: 400, message: "Invalid total USD amount" };
    }

    // -----------------------------------------
    // 🔥 APPLY PROMO CODE LOGIC (Same as Frontend)
    // -----------------------------------------
    let discountUSD = 0;

    if (promoCode && typeof promoCode === "string") {
      if (promoCode.toLowerCase() === "welcome10") {
        discountUSD = subtotalUSD * 0.1; // 10% only on product price
      }
    }

    // Apply discount
    totalAmountUSD = totalAmountUSD - discountUSD;

    if (totalAmountUSD <= 0) {
      return { data: null, statusCode: 400, message: "Invalid amount after discount" };
    }

    // CURRENCY CONVERSION
    let liveRate = 88.92;
    try {
      const cc = new CC({ from: "USD", to: "INR" });
      const result = await cc.convert(1);
      if (result && !isNaN(result)) liveRate = result;
    } catch (e) {}

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
      subtotalUSD,
      shippingUSD,
      discountUSD,
      promoCode: promoCode || null,
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
