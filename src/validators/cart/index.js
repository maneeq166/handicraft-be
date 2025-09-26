const { body, query } = require("express-validator");

exports.validateCartCreation = [
  body("userId")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID format"),

  body("products")
    .isArray({ min: 1 }).withMessage("Products must be a non-empty array"),

  body("products.*.productId")
    .notEmpty().withMessage("Product ID is required")
    .isMongoId().withMessage("Invalid Product ID format"),

  body("products.*.quantity")
    .notEmpty().withMessage("Quantity is required")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

exports.validateCartRead = [
  query("userId")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID format"),
];

exports.validateCartUpdation = [
  body("userId")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID format"),

  body("productId")
    .notEmpty().withMessage("Product ID is required")
    .isMongoId().withMessage("Invalid Product ID format"),

  body("quantity")
    .notEmpty().withMessage("Quantity is required")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

exports.validateCartDeletion = [
  body("userId")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID format"),
];
