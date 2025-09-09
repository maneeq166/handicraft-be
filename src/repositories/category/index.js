const Category = require("../../models/categoryModel")

exports.createCategory = async (categoryName,description) =>{
    return await Category.create({categoryName,description});
}

exports.readCategory = async (categoryName)=>{
    return await Category.findOne({categoryName:categoryName})
}

exports.updateCategory = async (id,updatedFields)=>{
    if(updatedFields.products){
       await Category.findByIdAndUpdate(id,{$push:{products:updatedFields.product}})
       
    }

    return await Category.findByIdAndUpdate(id,{$set:updatedFields}); 
}

exports.deleteCategory = async(id)=>{
    return await Category.findByIdAndDelete(id);
}