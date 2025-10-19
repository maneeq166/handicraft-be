const Product = require("../../models/productModel");

exports.createProduct = async (
  productName,
  price,
  description,
  stock,
  images
) => {
  console.log(3);
  
  return await Product.create({
    productName,
    price,
    description,
    stock,
    images,
  });
  console.log(4);
  
};

exports.readProduct = async (productName, category) => {
  if (productName && !category){
    return await Product.findOne({ productName });
  } else if (category && !productName) {
    return await Product.find({ category });
  }

  return await Product.find();
};

exports.updateProduct = async (id, updatedFields) => {
  return await Product.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
