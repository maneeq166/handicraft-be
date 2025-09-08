const { handleUserCreation, handleUserLogin, handleUserUpdation, handleUserDeletion, handleUserRead } = require("../../controllers/auth");

const router = require("express").Router();

router.route("/register").post(handleUserCreation);
router.route("/login").post(handleUserLogin);// phoneNumber login is not working
router.route("/search").get(handleUserRead);
router.route("/update/:id").put(handleUserUpdation);
router.route("/delete/:id").delete(handleUserDeletion);

module.exports = router;