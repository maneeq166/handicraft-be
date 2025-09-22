const Cart = require("../../models/cartModel");

exports.createCart = async (userId, products) => {
  return await Cart.create({ userId: userId, products: products });
};

exports.readCart = async (userId) => {
  return await Cart.findOne({ userId: userId });
};

exports.updateCart = async (userId, products) => {
  return await Cart.findOneAndUpdate(
    { userId },
    { $set: { products: products } },
    { new: true }
  );
};

exports.deleteCart = async (userId) => {
  return await Cart.findOneAndDelete({userId});
};
