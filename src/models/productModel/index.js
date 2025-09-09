const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    stock:{type:Number,required:true},
    images:{type:[String],required:true},
    // ratings:{type:Number,required:true}
},
{timestamps:true})

const Product = mongoose.model("product",productSchema);

module.exports = Product