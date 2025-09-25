const { handleUserCreation, handleUserLogin, handleUserUpdation, handleUserDeletion, handleUserRead } = require("../../controllers/auth");
const { isAdmin, isUser } = require("../../middleware/loginMiddleware");

const router = require("express").Router();

router.route("/register").post(handleUserCreation);
router.route("/login").post(handleUserLogin);// phoneNumber login is not working
router.route("/search").get(isAdmin,handleUserRead);
router.route("/update/:id").put(isUser,handleUserUpdation);
router.route("/delete/:id").delete(isAdmin,handleUserDeletion);

module.exports = router;