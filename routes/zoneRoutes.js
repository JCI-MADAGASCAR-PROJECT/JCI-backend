import { Router } from "express";
import { create, deleteZone, fetchAll, update } from "../controllers/zoneControllers.js";

const router = Router();

/**
 * @swagger
 * /api/v1/zones:
 *   get:
 *     summary: Get all zones
 *     tags:
 *       - Zones
 *     responses:
 *       200:
 *         description: List of zones
 *       500:
 *         description: Server error
 */
router.get("/",fetchAll);
/**
 * @swagger
 * /api/v1/zones:
 *   post:
 *     summary: Create a new zone
 *     tags:
 *       - Zones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Zone created successfully
 *       500:
 *         description: Server error
 */
router.post("/", create);
/**
 * @swagger
 * /api/v1/zones/{id}:
 *   put:
 *     summary: Update a zone by ID
 *     tags:
 *       - Zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the zone to update
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
 *               imgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Zone updated successfully
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Server error
 */
router.put("/:id",update);
/**
 * @swagger
 * /api/v1/zones/{id}:
 *   delete:
 *     summary: Delete a zone by ID
 *     tags:
 *       - Zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the zone to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zone deleted successfully
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",deleteZone);

export default router;