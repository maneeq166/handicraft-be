const {
  handleCartCreation,
  handleCartRead,
  handleCartUpdation,
  handleCartDeletion,
} = require("../../controllers/cart");

const router = require("express").Router();

router
  .route("/")
  .post(handleCartCreation)
  .get(handleCartRead)
  .put(handleCartUpdation)
  .delete(handleCartDeletion);

module.exports = router;
