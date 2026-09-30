import { Router } from "express";
import { create, deletePastPresident, fetchAll, update } from "../controllers/pastPresidentControllers.js";
import { uploadAvatar, addImagePathAvatar,verifyImageFile, uploadAvatarToOvh } from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();
/**
 * @swagger
 * /api/v1/past-presidents:
 *   get:
 *     summary: Get all past presidents
 *     tags:
 *       - Past Presidents
 *     responses:
 *       200:
 *         description: List of past presidents
 *       500:
 *         description: Server error
 */
router.get("/", fetchAll);


/**
 * @swagger
 * /api/v1/past-presidents:
 *   post:
 *     summary: Create a new past president
 *     tags:
 *       - Past Presidents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                 type: number
 *               imgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Past president created successfully
 *       500:
 *         description: Server error
 */
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), uploadAvatar, verifyImageFile, uploadAvatarToOvh, addImagePathAvatar, create);
/**
 * @swagger
 * /api/v1/past-presidents/{id}:
 *   put:
 *     summary: Update a past president by ID
 *     tags:
 *       - Past Presidents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the past president to update
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
 *               year:
 *                 type: number
 *               imgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Past president updated successfully
 *       404:
 *         description: Past president not found
 *       500:
 *         description: Server error
 */
router.put("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), uploadAvatar, verifyImageFile, uploadAvatarToOvh, addImagePathAvatar, update);
/**
 * @swagger
 * /api/v1/past-presidents/{id}:
 *   delete:
 *     summary: Delete a past president by ID
 *     tags:
 *       - Past Presidents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the past president to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Past president deleted successfully
 *       404:
 *         description: Past president not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), deletePastPresident);

export default router;