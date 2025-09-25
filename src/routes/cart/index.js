// routes/cart.js
const {
  handleCartCreation,
  handleCartRead,
  handleCartUpdation,
  handleCartDeletion,
} = require("../../controllers/cart");
const { isUser } = require("../../middleware/loginMiddleware");

const router = require("express").Router();

router
  .route("/")
  .post(isUser,handleCartCreation)
  .get(isUser,handleCartRead)
  .put(isUser,handleCartUpdation)
  .delete(isUser,handleCartDeletion);

module.exports = router;
