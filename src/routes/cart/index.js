const {
  handleCartCreation,
  handleCartRead,
  handleCartUpdation,
  handleCartDeletion,
} = require("../../controllers/cart");
const { isUser } = require("../../middleware/loginMiddleware");
const { validateCartCreation, validateCartRead, validateCartUpdation, validateCartDeletion } = require("../../validators/cart");
const { validateRequest } = require("../../middleware/validateRequest");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management for users
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a cart for a user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - products
 *             properties:
 *               userId:
 *                 type: string
 *                 description: MongoDB ObjectId of the user
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: MongoDB ObjectId of the product
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Bad request
 */
router.route("/").post(validateCartCreation , validateRequest, isUser, handleCartCreation);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get a user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       404:
 *         description: Cart not found
 */
router.route("/").get(validateCartRead,validateRequest, isUser, handleCartRead);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart or product not found
 */
router.route("/").put(validateCartUpdation,validateRequest, isUser, handleCartUpdation);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Delete a user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 */
router.route("/").delete(validateCartDeletion,validateRequest,isUser, handleCartDeletion);

module.exports = router;
