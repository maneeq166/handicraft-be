const { Contact } = require("../../models/contactModel")

exports.createContactForm = async (fullName,phoneNumber,email,subject,message) =>{
    return await Contact.create({fullName,phoneNumber,email,subject,message})
}

exports.checkContactForms = async (subject,fullName,phoneNumber) =>{
    if(subject && !fullName && !phoneNumber){
        return await Contact.findOne({subject:subject})
    }else if(!subject && fullName && !phoneNumber){
        return await Contact.findOne({fullName:fullName})
    }else if(!subject && !fullName && phoneNumber){
        return await Contact.findOne({phoneNumber:phoneNumber})
    }
    return await Contact.find();
}

exports.updateContactForm = async (id,done)=>{
    return await Contact.findByIdAndUpdate(id,{done})
}


exports.deleteContactForm = async (id) =>{
    return await Contact.findByIdAndUpdate(id);
}

