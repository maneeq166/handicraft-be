const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    subject:{type:String,required:true},
    message:{type:String,required:true},
    done:{type:Boolean,required:true,default:false}
})

const Contact = mongoose.model("contact",contactSchema);

module.exports = {Contact};