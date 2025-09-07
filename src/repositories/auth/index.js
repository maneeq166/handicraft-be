// repositories/auth/index.js

const { env } = require("../../config/env");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");    

exports.createUser = async (username,password,email,phoneNumber,location) =>{
    return await User.create({username,email,password,phoneNumber,location}).select("-password");
}

exports.createToken =  (_id,username,phoneNumber,location,role) =>{
    return jwt.sign({id:_id,username:username,phoneNumber:phoneNumber,location:location,role:role},env.JWT_SECRET);
} 

exports.verifyToken = (token) =>{
    return jwt.verify(token,env.JWT_SECRET);
}

exports.checkUser = async (email, phoneNumber) => {
  if (!email && !phoneNumber) {
    return await User.find();
  }

  const conditions = [];

  if (email) {
    conditions.push({ email });
  }

  if (phoneNumber) {
    conditions.push({ phoneNumber });
  }

  return await User.findOne({ $or: conditions });
};



exports.updateUser = async (_id,updatedFields) =>{
    // if(phoneNumber && !email){
    //     return await User.findOneAndUpdate({phoneNumber:phoneNumber},{$set:updatedFields},{new:true})
    // }else if(email && !phoneNumber){
    //     return await User.findOneAndUpdate({email:email},{$set:updatedFields},{new:true})
    // }
    return await User.findByIdAndUpdate(_id,{$set:updatedFields},{new:true})
}

exports.deleteUser = async (_id) =>{
    // if(email && !phoneNumber){
    //     return await User.findOneAndDelete({email:email})
    // }else if(phoneNumber && !email ){
    //     return await User.findOneAndDelete({phoneNumber:phoneNumber});
    // }
    return await User.findByIdAndDelete(_id);
}