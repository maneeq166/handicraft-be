// controllers/auth/index.js
const {
  UserCreation,
  UserSearch,
  UserUpdate,
  UserDeletion,
  UserLogin,
} = require("../../services/auth");
const { asyncHandler } = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");

exports.handleUserCreation = asyncHandler(async (req, res) => {
  const { username, email, password, phoneNumber, location } = req.body;

  const result = await UserCreation(
    username,
    email,
    password,
    phoneNumber,
    location
  );

  const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

exports.handleUserLogin = asyncHandler(async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  const result = await UserLogin(email, phoneNumber, password);
  const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});
exports.handleUserRead = asyncHandler(async (req, res) => {
  const { email, phoneNumber } = req.body;

  const result = await UserSearch(email, phoneNumber);
  const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

exports.handleUserUpdation = asyncHandler(async (req, res) => {
  const {id} = req.params;  
  const { updatedFields } = req.body;

  const result = await UserUpdate(id, updatedFields);

  const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

exports.handleUserDeletion = asyncHandler(async (req, res) => {
  const {id} = req.params;  

  const result = await UserDeletion(id);

  const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});
