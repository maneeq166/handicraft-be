const { createContactForm, checkContactForms, updateContactForm, deleteContactForm } = require("../../repositories/contact")

exports.creationOfContactForm = async (fullName,phoneNumber,email,subject,message) =>{
    if(!fullName||!phoneNumber||!email||!subject||!message){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }

    let contact = await createContactForm(fullName,phoneNumber,email,subject,message);

    if(!contact){
        return{
            data:null,
            statusCode:400,
            message:"Something went wrong"
        }
    }

    return {
        data:contact,
        statusCode:201,
        message:"Created Contact Form"
    }
}

exports.getContactForm = async (subject,fullName,phoneNumber) =>{
    let contact =  await checkContactForms(subject,fullName,phoneNumber);

    if(!contact){
        return{
            data:null,
            statusCode:400,
            message:"Something went wrong"
        }
    }

    return {
        data:contact,
        statusCode:200,
        message:"Fetched Contacts"
    }
}

exports.updationContactForm = async (id,done) =>{
    if(!id || !done){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    let contact = await updateContactForm(id,done);

    if(!contact){
        return{
            data:null,
            statusCode:400,
            message:"Something went wrong"
        }
    }

    return {
        data:contact,
        statusCode:201,
        message:"Updated Contact form"
    }
}


exports.deletionContactForm = async (id) =>{
    if(!id){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }


    let contact = await deleteContactForm(id);

    if(!contact){
        return{
            data:null,
            statusCode:400,
            message:"Something went wrong"
        }
    }

    return {
        data:contact,
        statusCode:201,
        message:"Deleted Contact Form"
    }
}