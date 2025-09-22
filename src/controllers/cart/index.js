const { CreateCart, ReadCart, UpdateCart, DeleteCart } = require("../../services/cart");
const ApiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

exports.handleCartCreation = asyncHandler(async(req,res)=>{
    const {userId,products} = req.body;

    const result = await CreateCart(userId,products);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleCartRead = asyncHandler(async(req,res)=>{
    const {userId} = req.query;

    const result = await ReadCart(userId);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})


exports.handleCartUpdation = asyncHandler(async(req,res)=>{
    const {userId,products} = req.body;

    const result = await UpdateCart(userId,products);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleCartDeletion = asyncHandler(async(req,res)=>{
    const {userId} = req.body;
    const result = await DeleteCart(userId);

    const {message,statusCode,data} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})