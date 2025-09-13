const { readProduct, createProduct, updateProduct, deleteProduct } = require("../../repositories/product")

exports.ProductCreation = async (productName,price,description,category,stock,images) =>{
    if(!productName || !price || !description || !category || !stock || !images){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    let product = await readProduct(productName);

    if(product){
        return {
            data:null,
            message:"Product exists already",
            statusCode:400
        }
    }

    product = await createProduct(productName,price,description,category,stock,images);

    return {
        data:product,
        message:"Product created!",
        statusCode:201
    }
}

exports.ProductRead = async (productName,category) =>{

    let product = await readProduct(productName,category);

    if(!product){
        return {
            data:null,
            statusCode:404,
            message:"Product does not exist"
        }
    }

    return {
        data:product,
        statusCode:200,
        message:"Product exisits"
    }
}

exports.ProductUpdation = async (id,updatedFields) =>{
    if(!id||!updatedFields){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        } 
    }

    let product = await updateProduct(id,updatedFields);

    if(!product){
        return {
            data:null,
            message:"Update failed!",
            statusCode:400
        }
    }

    return {
        data:product,
        statusCode:200,
        message:"Product update sucessfull"
    }
}

exports.ProductDelete = async (id) =>{
    if(!id){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    let product = await deleteProduct(id);

    return {
        data:product,
        message:"Product deletion successfull",
        statusCode:200
    }
}


