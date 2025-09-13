const {
  handleProductCreation,
  handleProductRead,
  handleProductUpdation,
  handleProductDeletion,
} = require("../../controllers/product");

const router = require("express").Router();

router
  .route("/")
  .post(handleProductCreation)
  .get(handleProductRead)
  .put(handleProductUpdation)
  .delete(handleProductDeletion);


  module.exports = router;