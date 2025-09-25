const Cart = require("../../models/cartModel");

exports.createCart = async (userId, products) => {
  return await Cart.create({ userId: userId, products:{productId: products} });
};

exports.readCart = async (userId) => {
  return await Cart.findOne({ userId: userId });
};

exports.updateCart = async (userId, productId, quantity = 1) => {
  // Try to update quantity if product already exists
  let cart = await Cart.findOneAndUpdate(
    { userId, "products.productId": productId },
    { $inc: { "products.$.quantity": quantity } },
    { new: true }
  );

  // If product not found, push a new one
  if (!cart) {
    cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { products: { productId, quantity } } },
      { new: true, upsert: true }
    );
  }

  return cart;
};



exports.deleteCart = async (userId) => {
  return await Cart.findOneAndDelete({userId});
};
