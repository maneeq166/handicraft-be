const { body, query } = require("express-validator");

exports.validateCategoryCreation = [
  body("categoryName")
    .notEmpty().withMessage("Category name is required")
    .isString().withMessage("Category name must be a string")
    .isLength({ min: 2 }).withMessage("Category name must be at least 2 characters long"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),
];

exports.validateCategoryRead = [
  query("categoryName")
    .optional()
    .isString().withMessage("Category name must be a string"),
];

exports.validateCategoryUpdation = [
  body("id")
    .notEmpty().withMessage("Category ID is required")
    .isMongoId().withMessage("Invalid category ID format"),

  body("updatedFields")
    .notEmpty().withMessage("updatedFields is required")
    .isObject().withMessage("updatedFields must be an object"),
];

exports.validateCategoryDeletion = [
  body("id")
    .notEmpty().withMessage("Category ID is required")
    .isMongoId().withMessage("Invalid category ID format"),
];
