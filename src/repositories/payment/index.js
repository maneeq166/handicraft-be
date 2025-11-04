const Order = require("../../models/orderModel/index.js");

exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};


exports.getUser = async (user) =>{
  if(!user){
    return await Order.find();
  }else if(user){
    return await Order.find({user:{$regex:user,$options:"i"}})
  }
}

exports.getOrder = async(products)=>{
  if(!products){
    return await Order.find();
  }else if(products){
    return await Order.find({products:{$regex:products,$options:"i"}});
  }
}


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

exports.deleteOrder = async(id)=>{
  return await Order.findByIdAndDelete(id,{new:true});
}