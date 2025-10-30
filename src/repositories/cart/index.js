const Cart = require("../../models/cartModel");

exports.createCart = async (userId, productsArray) => {
  // productsArray should be [{ productId: "...", quantity: N }, ...]
  return await Cart.create({
    userId: userId,
    products: productsArray,
  });
};

exports.readCart = async (userId) => {
  return await Cart.findOne({ userId: userId }).populate("products.productId");;
};

exports.updateCart = async (userId, productId, quantity = 1) => {
  if (!userId || !productId) return null;

  // 🧠 If quantity <= 0 → remove item
  if (quantity <= 0) {
    const updated = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    ).populate("products.productId");
    return updated;
  }

  // 🧠 If item exists → update quantity
  const updated = await Cart.findOneAndUpdate(
    { userId, "products.productId": productId },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  ).populate("products.productId");

  // 🧠 If item not found → push new
  if (updated) return updated;

  const newCart = await Cart.findOneAndUpdate(
    { userId },
    { $push: { products: { productId, quantity } } },
    { new: true, upsert: true }
  ).populate("products.productId");

  return newCart;
};




// Remove specific product
exports.deleteCartItem = async (userId, productId) => {
  return await Cart.findOneAndUpdate(
    { userId },
    { $pull: { products: { productId } } },
    { new: true }
  ).populate("products.productId");
};

// Remove entire cart
exports.deleteEntireCart = async (userId) => {
  return await Cart.findOneAndDelete({ userId });
};

