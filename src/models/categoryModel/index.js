const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName:{type:String,required:true,unique:true},
    // products:{type:[mongoose.Schema.Types.ObjectId]}
    description:{type:String}
},{timestamps:true})

const Category = mongoose.model("category",categorySchema);