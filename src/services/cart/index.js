const { readCart, createCart, updateCart, deleteCartItem , deleteEntireCart  } = require("../../repositories/cart")

// ...existing code...
exports.CreateCart = async (userId, products) => {
  if (!userId || !products || (Array.isArray(products) && products.length === 0)) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  // ensure products is an array of { productId, quantity }
  const normalizedProducts = Array.isArray(products)
    ? products.map((p) => {
        // p can be { productId, quantity } or just an id string
        if (typeof p === "string" || typeof p === "number") {
          return { productId: String(p), quantity: 1 };
        }
        return {
          productId: String(p.productId ?? p.id ?? p._id),
          quantity: Number(p.quantity ?? 1),
        };
      })
    : [{ productId: String(products), quantity: 1 }];

  let cart = await readCart(userId);
  if (cart) {
    return { data: null, statusCode: 400, message: "Cart already exists" };
  }

  cart = await createCart(userId, normalizedProducts);

  return { data: cart, statusCode: 201, message: "Cart Created" };
};


exports.ReadCart = async (userId)=>{
    if(!userId){
        return{
            data:null,
            statusCode:404,
            message:"Required fields are missing"
        }
    }

    let cart = await readCart(userId);

    if(!cart){
        return {
            data:null,
            statusCode:404,
            message:"Cart does not exist"
        }
    }

    return {
        data:cart,
        statusCode:200,
        message:"Cart exists"
    }
}


exports.UpdateCart = async (userId, productId, quantity) => {
  if (!userId || !productId || quantity == null) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let cart = await updateCart(userId, productId, Number(quantity));

  return {
    data: cart,
    statusCode: 200,
    message: "Cart updated",
  };
};

exports.DeleteCart = async (userId, productId) => {
  if (!userId) {
    return {
      data: null,
      statusCode: 404,
      message: "User ID is required",
    };
  }

  let cart;

  if (productId) {
    // 🧩 Remove one product
    cart = await deleteCartItem(userId, productId);
  } else {
    // 🧨 Remove entire cart
    cart = await deleteEntireCart(userId);
  }

  if (!cart) {
    return {
      data: null,
      statusCode: 404,
      message: productId
        ? "Cart or product not found"
        : "Cart already empty or not found",
    };
  }

  return {
    data: cart,
    statusCode: 200,
    message: productId
      ? "Product removed from cart"
      : "Entire cart deleted successfully",
  };
};
