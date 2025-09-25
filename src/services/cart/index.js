const { readCart, createCart, updateCart, deleteCart } = require("../../repositories/cart")

exports.CreateCart = async (userId,products) =>{
    if(!userId||!products){
        return{
            data:null,
            statusCode:404,
            message:"Required fields are missing"
        }
    }

    let cart = await readCart(userId);

    if(cart){
        return {
            data:null,
            statusCode:400,
            message:"Already exists"
        }
    }

    cart = await createCart(userId,products);

    return {
        data:cart,
        statusCode:201,
        message:"Cart Created"
    }
}

exports.ReadCart = async (userId)=>{
    if(!userId){
        return{
            data:null,
            statusCode:404,
            message:"Required fields are missing"
        }
    }

    let cart = await readCart(userId);

    if(!cart){
        return {
            data:null,
            statusCode:404,
            message:"Cart does not exist"
        }
    }

    return {
        data:cart,
        statusCode:200,
        message:"Cart exists"
    }
}


exports.UpdateCart = async (userId, productId, quantity) =>{    
    if(!userId|| !productId|| !quantity){
        return{
            data:null,
            statusCode:404,
            message:"Required fields are missing"
        }
    }

    let cart = await updateCart(userId, productId, quantity);

    return {
        data:cart,
        statusCode:200,
        message:"Cart updated"
    }
}

exports.DeleteCart = async (userId)=>{
    if(!userId){
        return{
            data:null,
            statusCode:404,
            message:"Required fields are missing"
        }
    }

    let cart = await deleteCart(userId);

    if(!cart){
        return {
            data:null,
            statusCode:404,
            message:"Cart doesn't exist"
        }
    }

    return {
        data:cart,
        statusCode:200,
        message:"Cart updated"
    }
}