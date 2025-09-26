const { body, query } = require("express-validator");

exports.validateProductCreation = [
  body("productName")
    .notEmpty().withMessage("Product name is required")
    .isString().withMessage("Product name must be a string")
    .isLength({ min: 2 }).withMessage("Product name must be at least 2 characters long"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string"),

  body("category")
    .notEmpty().withMessage("Category ID is required")
    .isMongoId().withMessage("Invalid category ID format"),

  body("stock")
    .notEmpty().withMessage("Stock is required")
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

  body("images")
    .notEmpty().withMessage("Images field is required")
    .isString().withMessage("Images must be a string (URL or Cloudinary public ID)"),
];

exports.validateProductRead = [
  query("productName")
    .optional()
    .isString().withMessage("Product name must be a string"),

  query("category")
    .optional()
    .isMongoId().withMessage("Invalid category ID format"),
];

exports.validateProductUpdation = [
  body("id")
    .notEmpty().withMessage("Product ID is required")
    .isMongoId().withMessage("Invalid product ID format"),

  body("updatedFields")
    .notEmpty().withMessage("updatedFields is required")
    .isObject().withMessage("updatedFields must be an object"),
];

exports.validateProductDeletion = [
  body("id")
    .notEmpty().withMessage("Product ID is required")
    .isMongoId().withMessage("Invalid product ID format"),
];
