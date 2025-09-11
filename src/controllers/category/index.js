const { CategoryCreation, CategoryRead, CategoryUpdation, CategoryDeletion } = require("../../services/category");
const {asyncHandler} = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");


exports.handleCreateCategory = asyncHandler(async(req,res)=>{
    const {categoryName,description} = req.body;

    const result = await CategoryCreation(categoryName,description);
    const {message,data,statusCode} = result;

    res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleReadCategory = asyncHandler(async(req,res)=>{
    const {categoryName} = req.params;

    const result = await CategoryRead(categoryName);

    const {message,data,statusCode} = result;

    res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleUpdateCategory = asyncHandler(async (req,res)=>{
    const {id,updatedFields} = req.body;

    const result = await CategoryUpdation(id,updatedFields);

    const {message,data,statusCode} = result;

    res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleDeletionCategory = asyncHandler(async(req,res)=>{
    const {id} = req.body;

    const result = await CategoryDeletion(id);

    const {message,data,statusCode} = result;

    res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})