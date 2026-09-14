import { Router } from "express";
import { create, deleteZonePresident, fetchPsd, update } from "../controllers/zonePresidentControllers.js";

const router = Router();

/**
 * @swagger
 * /api/v1/zone/presidents/{zoneId}:
 *   get:
 *     summary: Get all Zone Presidents by zone ID
 *     tags:
 *       - Zone President
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         description: ID of the Zone President to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Zone Presidents
 *       500:
 *         description: Server error
 */
router.get("/:zoneId",fetchPsd);

/**
 * @swagger
 * /api/v1/zone/presidents:
 *   post:
 *     summary: Create a new Zone President
 *     tags:
 *       - Zone President
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quote:
 *                 type: string
 *               contact:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *               zoneId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Zone President created successfully
 *       500:
 *         description: Server error
 */
router.post("/", create);
/**
 * @swagger
 * /api/v1/zone/presidents/{id}:
 *   put:
 *     summary: Update a Zone President by ID
 *     tags:
 *       - Zone President
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Zone President to update
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
 *               quote:
 *                 type: string
 *               contact:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *               zoneId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Zone President updated successfully
 *       404:
 *         description: Zone President not found
 *       500:
 *         description: Server error
 */
router.put("/:id",update);
/**
 * @swagger
 * /api/v1/zone/presidents/{id}:
 *   delete:
 *     summary: Delete a Zone President by ID
 *     tags:
 *       - Zone President
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Zone President to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zone President deleted successfully
 *       404:
 *         description: Zone President not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",deleteZonePresident);

export default router;