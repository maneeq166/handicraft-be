const mongoose = require('mongoose');
const Order = require("../../models/orderModel/index.js");


exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

exports.getUser = async (user) => {
  if (!user) {
    return await Order.find();
  } else if (user) {
    return await Order.find({ user });
  }
};

exports.getOrder = async (productId) => {
  if (productId) {
    const orders = await Order.aggregate([
      { $match: { "products.product": new mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          mergedProducts: {
            $map: {
              input: "$products",
              as: "p",
              in: {
                $mergeObjects: [
                  "$$p",
                  {
                    productInfo: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$productDetails",
                            as: "pd",
                            cond: { $eq: ["$$pd._id", "$$p.product"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          mergedProducts: 1,
          totalAmountINR: 1,
          totalAmountUSD: 1,
          paymentStatus: 1,
          razorpayOrderId: 1,
          razorpayPaymentId: 1,
          razorpaySignature: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return {
      count: orders.length,
      data: orders,
    };
  } else {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          mergedProducts: {
            $map: {
              input: "$products",
              as: "p",
              in: {
                $mergeObjects: [
                  "$$p",
                  {
                    productInfo: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$productDetails",
                            as: "pd",
                            cond: { $eq: ["$$pd._id", "$$p.product"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          mergedProducts: 1,
          totalAmountINR: 1,
          totalAmountUSD: 1,
          paymentStatus: 1,
          razorpayOrderId: 1,
          razorpayPaymentId: 1,
          razorpaySignature: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return {
      count: orders.length,
      data: orders,
    };
  }
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

exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id, { new: true });
};
