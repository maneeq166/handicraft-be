const { body, param, query } = require("express-validator");

exports.validateUserCreation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+\d{10,15}$/)
    .withMessage("Invalid phone number format"),

  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be an String"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
];

exports.validateUserLogin = [
  body("password").notEmpty().withMessage("Password is required"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("phoneNumber")
    .optional()
    .matches(/^\+\d{10,15}$/)
    .withMessage(
      "Phone number must include country code and contain 10–15 digits"
    ),
];

exports.validateUserRead = [
  query("email").optional().isEmail().withMessage("Invalid email format"),
  query("phoneNumber")
    .optional()
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage(
      "Invalid phone number format (must include country code, e.g. +919876543210)"
    ),
];

exports.validateUserUpdation = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("updatedFields").notEmpty().withMessage("Updated fields are required"),
];

exports.validateUserDeletion = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];
