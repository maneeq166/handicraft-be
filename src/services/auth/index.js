// services/auth/index.js
const {
  checkUser,
  createUser,
  updateUser,
  deleteUser,
  createToken,
} = require("../../repositories/auth");
const bcrypt = require("bcrypt");
exports.UserCreation = async (
  username,
  email,
  password,
  phoneNumber,
  location,
  role
) => {
  if (!username || !email || !password || !phoneNumber || !role || !location) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing!",
    };
  }

  let user = await checkUser(email, phoneNumber);
  
  if (user) {
    return {
      data: null,
      message: "Something Went wrong",
      statusCode: 400,
    };
  }

  const hashedPass = await bcrypt.hash(password, 15);

  user = await createUser(username, hashedPass, email, phoneNumber, location,role);
  
  

  return {
    data: user,
    message: "Registered",
    statusCode: 201,
  };
};

exports.UserLogin = async (email, phoneNumber, password) => {
  if ((!phoneNumber || !password)&& !password) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let user = await checkUser(email, phoneNumber);

  if (!user) {
    return {
      data: null,
      message: "Account doesnt Exist",
      statusCode: 400,
    };
  }

  let correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    return {
      data: null,
      message: "Something went wrong",
      statusCode: 400,
    };
  }

  let token = createToken(
    user._id,
    user.username,
    user.phoneNumber,
    user.location,
    user.role
  );

  return {
    data: token,
    message: "Logged In!",
    statusCode: 200,
  };
};

exports.UserSearch = async (email, phoneNumber) => {
  let user = await checkUser(email, phoneNumber);

  if (!user) {
    return {
      data: null,
      message: "No users returned!",
      statusCode: 400,
    };
  }

  return {
    data: user,
    statusCode: 200,
    message: "Search Successfull",
  };
};

exports.UserUpdate = async (_id, updatedFields) => {
  if (!_id && !updatedFields){
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }
  let user = await updateUser(_id, updatedFields);

  if (!user) {
    return {
      data: null,
      statusCode: 400,
      message: "Something went wrong",
    };
  }

  
  
  return {
    data: user,
    statusCode: 200,
    message: "User updated!",
  };
};

exports.UserDeletion = async (_id) => {
  if (!_id) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let user = await deleteUser(_id);

  if (!user) {
    return {
      data: null,
      statusCode: 400,
      message: "Something went wrong",
    };
  }

  return {
    data: null,
    statusCode: 200,
    message: "User Deleted!",
  };
};
