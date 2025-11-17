const { handleCreateContactForm, handleReadContactForm, handleUpdateContactForm, handleDeletionContactForm } = require("../../controllers/contact");

const router = require("express").Router();

router.route("/").post(handleCreateContactForm).get(handleReadContactForm).put(handleUpdateContactForm).delete(handleDeletionContactForm);

module.exports=router