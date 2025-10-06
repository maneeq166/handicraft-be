const { asyncHandler } = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");
const {
  ProductCreation,
  ProductRead,
  ProductUpdation,
  ProductDelete,
} = require("../../services/product");

exports. handleProductCreation = asyncHandler(async (req, res) => {
  const { productName, price, description, category, stock, images } = req.body;

  const result = await ProductCreation(
    productName,
    price,
    description,
    category,
    stock,
    images
  );

  const { message, data, statusCode } = result;

  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleProductRead = asyncHandler(async (req, res) => {
  const { productName, category } = req.query;

  const result = await ProductRead(productName, category);

  const { message, data, statusCode } = result;

  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleProductUpdation = asyncHandler(async (req, res) => {
  const { id, updatedFields } = req.body;

  const result = await ProductUpdation(id, updatedFields);

  const { message, data, statusCode } = result;

  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleProductDeletion = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const result = await ProductDelete(id);

  const { message, data, statusCode } = result;

  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
