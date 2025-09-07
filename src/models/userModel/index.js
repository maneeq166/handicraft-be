const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,require:true,unique:true},
    phoneNumber:{type:Number,require:true,unique:true},
    location:{type:Object,require:true},
    role:{type:String,enum:["user","admin"],default:"user"}
},{timestamps:true})

const User = mongoose.model("user",userSchema);

module.exports = User;