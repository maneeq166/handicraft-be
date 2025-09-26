const { 
  handleUserCreation, 
  handleUserLogin, 
  handleUserUpdation, 
  handleUserDeletion, 
  handleUserRead 
} = require("../../controllers/auth");
const { isAdmin, isUser } = require("../../middleware/loginMiddleware");
const { validateRequest } = require("../../middleware/validateRequest");
const { validateUserCreation, validateUserRead, validateUserLogin, validateUserUpdation, validateUserDeletion } = require("../../validators/auth");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - phoneNumber
 *               - location
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               location:
 *                 type: object
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.route("/register").post(validateUserCreation,validateRequest,handleUserCreation);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email or phone number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.route("/login").post(validateUserLogin,validateRequest, handleUserLogin);

/**
 * @swagger
 * /auth/search:
 *   get:
 *     summary: Search users (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User(s) found
 *       403:
 *         description: Forbidden
 */
router.route("/search").get(isAdmin, handleUserRead);

/**
 * @swagger
 * /auth/update/{id}:
 *   put:
 *     summary: Update user (user only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedFields:
 *                 type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.route("/update/:id").put(validateUserUpdation,validateRequest, isUser, handleUserUpdation);

/**
 * @swagger
 * /auth/delete/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.route("/delete/:id").delete(validateUserDeletion, validateRequest, isAdmin, handleUserDeletion);

module.exports = router;
