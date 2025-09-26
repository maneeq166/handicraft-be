const { 
  handleCreateCategory, 
  handleReadCategory, 
  handleUpdateCategory, 
  handleDeletionCategory 
} = require("../../controllers/category");
const { isAdmin ,isUser } = require("../../middleware/loginMiddleware");
const { validateCategoryCreation, validateCategoryUpdation, validateCategoryDeletion } = require("../../validators/category");
const { validateRequest } = require("../../middleware/validateRequest");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management (admin only)
 */

/**
 * @swagger
 * /category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "Devices, gadgets and accessories"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.route("/create-category").post(validateCategoryCreation,validateRequest,isAdmin, handleCreateCategory);

/**
 * @swagger
 * /category/read-category:
 *   get:
 *     summary: Get categories (by name or all)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *           example: "Electronics"
 *         description: Optional category name to search
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       404:
 *         description: No category found
 */
router.route("/read-category").get(isUser, handleReadCategory);

/**
 * @swagger
 * /category/update-category:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
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
 *                 description: Category ID
 *               updatedFields:
 *                 type: object
 *                 example:
 *                   description: "Updated category description"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.route("/update-category").put(validateCategoryUpdation,validateRequest,isAdmin, handleUpdateCategory);

/**
 * @swagger
 * /category/delete-category:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
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
 *                 description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.route("/delete-category").delete(validateCategoryDeletion,validateRequest,isAdmin, handleDeletionCategory);

module.exports = router;
