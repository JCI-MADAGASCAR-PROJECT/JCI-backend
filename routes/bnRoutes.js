import { Router } from "express";
import { create, deleteBNMember, fetchAll, update } from "../controllers/bnControllers.js";

const router = Router();

/**
 * @swagger
 * /api/v1/bn:
 *   get:
 *     summary: Get all BN members
 *     tags:
 *       - BN
 *     responses:
 *       200:
 *         description: List of BN members
 *       500:
 *         description: Server error
 */
router.get("/",fetchAll);

/**
 * @swagger
 * /api/v1/bn:
 *   post:
 *     summary: Create a new BN member
 *     tags:
 *       - BN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstName:
 *                 type: string
 *               title:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: BN member created successfully
 *       500:
 *         description: Server error
 */
router.post("/", create);
/**
 * @swagger
 * /api/v1/bn/{id}:
 *   put:
 *     summary: Update a BN member by ID
 *     tags:
 *       - BN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the BN member to update
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
 *               firstName:
 *                 type: string
 *               title:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: BN member updated successfully
 *       404:
 *         description: BN member not found
 *       500:
 *         description: Server error
 */
router.put("/:id",update);
/**
 * @swagger
 * /api/v1/bn/{id}:
 *   delete:
 *     summary: Delete a BN member by ID
 *     tags:
 *       - BN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the BN member to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: BN member deleted successfully
 *       404:
 *         description: BN member not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",deleteBNMember);

export default router;