import { Router } from "express";
import { create, deleteOrganisationLocalContent, fetchOrganisationLocalesContentByOrganisationLocal, update } from "../controllers/organisationContentControllers.js";

const router = Router();

/**
 * @swagger
 * /api/v1/organisation-locales/contents/{organisationLocalId}:
 *   get:
 *     summary: Get all Organisation Locales content by Organisation Local ID
 *     tags:
 *       - Organisation Locale Content
 *     parameters:
 *       - in: path
 *         name: organisationLocalId
 *         required: true
 *         description: ID of the Organisation Locale to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Organisation Locale Content
 *       500:
 *         description: Server error
 */
router.get("/:organisationLocalId",fetchOrganisationLocalesContentByOrganisationLocal);

/**
 * @swagger
 * /api/v1/organisation-locales/contents:
 *   post:
 *     summary: Create a new Organisation Locale Content
 *     tags:
 *       - Organisation Locale Content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               organisationLocalId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Organisation Locale Content created successfully
 *       500:
 *         description: Server error
 */
router.post("/", create);
/**
 * @swagger
 * /api/v1/organisation-locales/contents/{id}:
 *   put:
 *     summary: Update an Organisation Locale Content by ID
 *     tags:
 *       - Organisation Locale Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Organisation Locale Content to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               organisationLocalId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Organisation Locale Content updated successfully
 *       404:
 *         description: Organisation Locale Content not found
 *       500:
 *         description: Server error
 */
router.put("/:id",update);
/**
 * @swagger
 * /api/v1/organisation-locales/contents/{id}:
 *   delete:
 *     summary: Delete an Organisation Locale Content by ID
 *     tags:
 *       - Organisation Locale Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Organisation Locale Content to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organisation Locale Content deleted successfully
 *       404:
 *         description: Organisation Locale Content not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",deleteOrganisationLocalContent);

export default router;