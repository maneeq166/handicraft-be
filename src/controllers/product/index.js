const { asyncHandler } = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");
const {
  ProductCreation,
  ProductRead,
  ProductUpdation,
  ProductDelete,
} = require("../../services/product");
const {uploadMultipleFiles} = require("../../utils/cloudinaryUpload/index");

exports.handleProductCreation = asyncHandler(async (req, res) => {
  const { productName, price, description, stock,netWeight } = req.body;
  const photos = req.files || [];

  const images = photos.length
    ? await uploadMultipleFiles(photos, 'products')
    : [];

    console.log("1");
    
  const result = await ProductCreation(
    productName,price,description,stock,images,netWeight
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
  const { id, productName, price, description, stock } = req.body;
  const photos = req.files || [];

  const images = photos.length
    ? await uploadMultipleFiles(photos, 'products')
    : [];

  const result = await ProductUpdation(id, {
    productName,
    price,
    description,
    stock,
    ...(images.length && { images }),
  });

  const { message, data, statusCode } = result;
  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleProductDeletion = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const result = await ProductDelete(id);

  const { message, data, statusCode } = result;

  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
