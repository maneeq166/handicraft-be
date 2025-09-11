const Category = require("../../models/categoryModel")

exports.createCategory = async (categoryName,description) =>{
    return await Category.create({categoryName,description});
}

exports.readCategory = async (categoryName)=>{
    if(!categoryName){
        return await Category.find();
    }
    return await Category.findOne({categoryName:categoryName})
}

exports.updateCategory = async (id,updatedFields)=>{
    if(updatedFields.product){
       await Category.findByIdAndUpdate(id,{$push:{products:updatedFields.product}})
        delete updatedFields.product;
    }

    return await Category.findByIdAndUpdate(id,updatedFields,{new:true}); 
}

exports.deleteCategory = async(id)=>{
    return await Category.findByIdAndDelete(id);
}