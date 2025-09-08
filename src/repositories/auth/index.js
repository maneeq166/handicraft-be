// repositories/auth/index.js

const { env } = require("../../config/env");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * Create a new user
 */
exports.createUser = async (username, password, email, phoneNumber, location, role) => {
  const user = await User.create({ username, email, password, phoneNumber, location, role });

  // Remove password before returning
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

/**
 * Create JWT Token
 */
exports.createToken = (_id, username, phoneNumber, location, role) => {
  return jwt.sign(
    { id: _id, username, phoneNumber, location, role },
    env.JWT_SECRET,
    { expiresIn: "1d" } // set token expiry
  );
};

/**
 * Verify JWT Token
 */
exports.verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

/**
 * Check if a user exists by email or phoneNumber
 */
exports.checkUser = async (email, phoneNumber) => {
  if (!email && !phoneNumber) {
    // return all users (no password)
    return await User.find().select("-password");
  } else if (email && phoneNumber) {
    // check both
    return await User.findOne({ $or: [{ email }, { phoneNumber }] });
  } else if (phoneNumber) {
    return await User.findOne({ phoneNumber });
  } else if (email) {
    return await User.findOne({ email });
  }
};


/**
 * Update user by ID
 */
exports.updateUser = async (_id, updatedFields) => {
  return await User.findByIdAndUpdate(
    _id,
    { $set: updatedFields },
    { new: true }
  ).select("-password");
};

/**
 * Delete user by ID
 */
exports.deleteUser = async (_id) => {
  return await User.findByIdAndDelete(_id).select("-password");
};
