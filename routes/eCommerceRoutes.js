import { Router } from "express";
import { create, deleteItem, fetchAll, update } from "../controllers/eCommerceControllers.js";
import { uploadItem, addImagePathItem,verifyImageFile, uploadItemToOvh } from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Get all items
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: List of items
 *       500:
 *         description: Server error
 */
router.get("/",fetchAll);


/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     summary: Create a new item
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *       500:
 *         description: Server error
 */
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL","ADMIN_E_COMMERCE"), uploadItem, verifyImageFile, uploadItemToOvh, addImagePathItem, create);
/**
 * @swagger
 * /api/v1/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.put("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL","ADMIN_E_COMMERCE"), uploadItem, verifyImageFile, uploadItemToOvh, addImagePathItem, update);
/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL","ADMIN_E_COMMERCE"), deleteItem);

export default router;