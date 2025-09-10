const { readCategory, createCategory, updateCategory, deleteCategory } = require("../../repositories/category")

exports.CategoryCreation = async (categoryName,description) =>{
    if(!categoryName||!description){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    let category = await readCategory(categoryName);

    if(category){
        return {
            data:null,
            message:"Category is already created!",
            statusCode:401
        }
    }

    category = await createCategory(categoryName,description);

    return {
        data:category,
        message:"Category is created!",
        statusCode:201
    }
}

exports.CategoryRead = async (categoryName)=>{
    if(!categoryName){
        return {
            data:null,
            statusCode:400,
            message:"Requried fields are missing"
        }
    }

    let categoryName = await readCategory(categoryName);

    if(!categoryName){
        return {
            data:null,
            statusCode:400,
            message:"No category found!"
        }
    }

    return {
        data:categoryName,
        message:"Category founded!",
        statusCode:200
    }
}

exports.CategoryUpdation = async (id,updatedFields) =>{
    if(!id || !updatedFields){
        return {
            data:null,
            message:"Required fields are misssing",
            statusCode:400
        }
    }

    let category = await updateCategory(id,updatedFields);

    if(!category){
        return {
            data:null,
            statusCode:400,
            message:"Something went wrong"
        }
    }


    return {
        data:category,
        message:"Category updated",
        statusCode:200
    }
}

exports.CategoryDeletion = async (id) =>{
    if(!id){
        return {
            data:null,
            message:"Required fields are misssing",
            statusCode:400
        }
    }
    let category = await deleteCategory(id);

    return {
        data:category,
        statusCode:200,
        message:"Category Deleted!"
    }
}