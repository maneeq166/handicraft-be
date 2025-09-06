const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true,unique:true},
    products:{type:[mongoose.Schema.Types.ObjectId],ref:"product"}
},{timestamps:true})

const Cart = mongoose.model("cart",cartSchema);
