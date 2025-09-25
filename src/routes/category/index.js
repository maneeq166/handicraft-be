const { handleCreateCategory, handleReadCategory, handleUpdateCategory, handleDeletionCategory } = require("../../controllers/category");
const { isAdmin } = require("../../middleware/loginMiddleware");

const router = require("express").Router();

router.route("/create-category").post(isAdmin,handleCreateCategory);
router.route("/read-category").get(isAdmin,handleReadCategory);
router.route("/update-category").put(isAdmin,handleUpdateCategory);
router.route("/delete-category").delete(isAdmin,handleDeletionCategory);

module.exports=router;