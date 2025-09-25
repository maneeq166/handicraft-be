const {
  handleProductCreation,
  handleProductRead,
  handleProductUpdation,
  handleProductDeletion,
} = require("../../controllers/product");
const { isAdmin } = require("../../middleware/loginMiddleware");

const router = require("express").Router();

router
  .route("/")
  .post(isAdmin,handleProductCreation)
  .get(isAdmin,handleProductRead)
  .put(isAdmin,handleProductUpdation)
  .delete(isAdmin,handleProductDeletion);


  module.exports = router;