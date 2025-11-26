const ApiResponse = require("../../utils/apiResponse");
const {
  createPaymentOrder,
  verifyPayment,
  getAllUsersOrders,
  getAllOrders,
  DeleteOrder,
} = require("../../services/payment/index");

exports.handleCreateOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    console.log("PAYMENT REQ BODY >>>", JSON.stringify(req.body));

    // basic validation
    if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        data: null,
        message: "userId and products are required",
      });
    }

    const result = await createPaymentOrder(userId, products);

    // result must be { data, statusCode, message }
    const statusCode = Number(result?.statusCode) || 500;
    const success = statusCode >= 200 && statusCode < 400;

    console.log("PAYMENT SERVICE RESULT >>>", { statusCode, message: result?.message });

    return res.status(statusCode).json({
      success,
      statusCode,
      data: result?.data ?? null,
      message: result?.message ?? (success ? "success" : "error"),
    });
  } catch (error) {
    // log full error so you can copy it from server logs
    console.error("HANDLE CREATE ORDER ERROR >>>", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      data: null,
      message: error?.message || "Internal Server Error",
    });
  }
};

exports.handleGetUserOrder = async (req,res) =>{
  try {
    const {user}= req.query;

    const result = await getAllUsersOrders(user);
    const { message, data, statusCode } = result;

    res.status(Number(statusCode) || 200).json(new ApiResponse(statusCode, data, message));

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.handleGetAllOrders = async (req,res)=>{
  try {
    const {products} = req.query;

    const result= await getAllOrders(products);

    const { message, data, statusCode } = result;

    res.status(Number(statusCode) || 200).json(new ApiResponse(statusCode, data, message));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

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

exports.handleOrderDeletion = async (id) =>{
  try {
    
  const {id} = req.body;

  const result = await DeleteOrder(id);

  const { message, data, statusCode } = result;

    res.status(Number(statusCode) || 200).json(new ApiResponse(statusCode, data, message));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}