const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    // category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    stock:{type:Number,required:true},
    images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  netWeight:{type:Number,required:true}
  // going to be an object of public id and url so we can upload immages on the cloudinary
    // ratings:{type:Number,required:true}
},
{timestamps:true})

const Product = mongoose.model("product",productSchema);

module.exports = Product