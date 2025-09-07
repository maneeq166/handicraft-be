const { handleUserCreation, handleUserLogin, handleUserUpdation, handleUserDeletion, handleUserRead } = require("../../controllers/auth");

const router = require("express").Router();

router.route("/register").post(handleUserCreation);
router.route("/login").post(handleUserLogin);
router.route("/search/:id").post(handleUserRead);
router.route("/update/:id").put(handleUserUpdation);
router.route("/deletion/:id").delete(handleUserDeletion);

module.exports = router;