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
    const { userId, products, totalAmountUSD } = req.body;

    const result = await createPaymentOrder(userId, products, totalAmountUSD);
    const { message, data, statusCode } = result;

    res.status(Number(statusCode) || 200).json(new ApiResponse(statusCode, data, message));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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