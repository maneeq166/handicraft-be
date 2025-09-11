const { handleCreateCategory, handleReadCategory, handleUpdateCategory, handleDeletionCategory } = require("../../controllers/category");

const router = require("express").Router();

router.route("/create-category").post(handleCreateCategory);
router.route("/read-category").get(handleReadCategory);
router.route("/update-category").put(handleUpdateCategory);
router.route("/delete-category").delete(handleDeletionCategory);

module.exports=router;