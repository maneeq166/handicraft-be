const { asyncHandler } = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");
const { creationOfContactForm, getContactForm, updationContactForm, deletionContactForm } = require("../../services/contact");
exports.handleCreateContactForm = asyncHandler(async(req,res)=>{
    const {fullName,phoneNumber,email,subject,messag} =req.body;

    const result = await creationOfContactForm(fullName,phoneNumber,email,subject,messag);

    const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
})

exports.handleReadContactForm = asyncHandler(async(req,res)=>{
    const {subject,fullName,phoneNumber} = req.query;

    const result = await getContactForm(subject,fullName,phoneNumber);
    const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
})

exports.handleUpdateContactForm = asyncHandler(async(req,res)=>{
    const {id,done}  = req.body;

    const result = await updationContactForm(id,done);

    const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
})

exports.handleDeletionContactForm = asyncHandler(async(req,res)=>{
    const {id} = req.body;

    const result = await deletionContactForm(id);
    const { message, data, statusCode } = result;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
})