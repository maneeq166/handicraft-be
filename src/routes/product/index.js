const {
  handleProductCreation,
  handleProductRead,
  handleProductUpdation,
  handleProductDeletion,
} = require("../../controllers/product");
const { isAdmin } = require("../../middleware/loginMiddleware");
const { validateProductCreation, validateProductDeletion, validateProductUpdation, validateProductRead } = require("../../validators/product");
const { validateRequest } = require("../../middleware/validateRequest");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management (admin only)
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - price
 *               - description
 *               - category
 *               - stock
 *               - images
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               price:
 *                 type: number
 *                 example: 999
 *               description:
 *                 type: string
 *                 example: "Latest Apple smartphone with A17 Bionic chip"
 *               category:
 *                 type: string
 *                 description: MongoDB ObjectId of category
 *                 example: "64b9f0c7c8b4e0d1a5f1c3a7"
 *               stock:
 *                 type: number
 *                 example: 50
 *               images:
 *                 type: string
 *                 description: Cloudinary public_id and URL
 *                 example: "{ public_id: 'iphone15', url: 'https://cloudinary.com/iphone15.png' }"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.route("/").post(validateProductCreation,validateRequest, isAdmin, handleProductCreation);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get products (all or filtered)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *           example: "iPhone"
 *         description: Filter products by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: "64b9f0c7c8b4e0d1a5f1c3a7"
 *         description: Filter products by category ObjectId
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: No product found
 */
router.route("/").get(validateProductRead,validateRequest,isAdmin, handleProductRead);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - updatedFields
 *             properties:
 *               id:
 *                 type: string
 *                 description: Product ID
 *                 example: "64ba01f7c8b4e0d1a5f1c3b2"
 *               updatedFields:
 *                 type: object
 *                 example:
 *                   price: 899
 *                   stock: 30
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.route("/").put(validateProductUpdation,validateRequest,isAdmin, handleProductUpdation);

/**
 * @swagger
 * /product:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: Product ID
 *                 example: "64ba01f7c8b4e0d1a5f1c3b2"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.route("/").delete(validateProductDeletion,validateRequest,isAdmin, handleProductDeletion);

module.exports = router;
