import { Router } from "express";
import { create, deleteOrganisationLocal, fetchOrganisationLocalesByZone, update } from "../controllers/organisationLocaleControllers.js";

const router = Router();

/**
 * @swagger
 * /api/v1/organisation-locales/{zoneId}:
 *   get:
 *     summary: Get all Organisation Locales by zone ID
 *     tags:
 *       - Organisation Locale
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         description: ID of the Organisation Locale to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Organisation Locales
 *       500:
 *         description: Server error
 */
router.get("/:zoneId",fetchOrganisationLocalesByZone);

/**
 * @swagger
 * /api/v1/organisation-locales:
 *   post:
 *     summary: Create a new Organisation Locale
 *     tags:
 *       - Organisation Locale
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               localisation:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               mapImgUrl:
 *                 type: string
 *               logoImgUrl:
 *                 type: string
 *               zoneId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Organisation Locale created successfully
 *       500:
 *         description: Server error
 */
router.post("/", create);
/**
 * @swagger
 * /api/v1/organisation-locales/{id}:
 *   put:
 *     summary: Update an Organisation Locale by ID
 *     tags:
 *       - Organisation Locale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Organisation Locale to update
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
 *               localisation:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               mapImgUrl:
 *                 type: string
 *               logoImgUrl:
 *                 type: string
 *               zoneId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Organisation Locale updated successfully
 *       404:
 *         description: Organisation Locale not found
 *       500:
 *         description: Server error
 */
router.put("/:id",update);
/**
 * @swagger
 * /api/v1/organisation-locales/{id}:
 *   delete:
 *     summary: Delete an Organisation Locale by ID
 *     tags:
 *       - Organisation Locale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Organisation Locale to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organisation Locale deleted successfully
 *       404:
 *         description: Organisation Locale not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",deleteOrganisationLocal);

export default router;