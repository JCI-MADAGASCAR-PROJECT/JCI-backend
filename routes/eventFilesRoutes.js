import { Router } from "express";
import { 
            create, 
            deleteEventFile,
            fetchAllByEventId
        } from "../controllers/eventFilesControllers.js";
import { addImagePathEventFiles, uploadEventFile , verifyPdfFile } from "../middleware/uploadMiddleware.js";
import { protect, authorize , requireOrganisationAccess } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/events/files/{eventId}:
 *   get:
 *     summary: Get all files for a specific event by Event ID
 *     tags:
 *       - Event Files
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the Event to fetch images for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Event Files
 *       500:
 *         description: Server error
 */
router.get("/:eventId",fetchAllByEventId);

/**
 * @swagger
 * /api/v1/events/files:
 *   post:
 *     summary: Create a new Event File
 *     tags:
 *       - Event Files
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileUrl:
 *                 type: string
 *               eventId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Event File created successfully
 *       500:
 *         description: Server error
 */
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"),
    // requireOrganisationAccess(async (req) => Number(req.body.organisationsLocaleId)),
        uploadEventFile, verifyPdfFile, addImagePathEventFiles, create);
/**
 * @swagger
 * /api/v1/events/files/{id}:
 *   delete:
 *     summary: Delete an Event File by ID
 *     tags:
 *       - Event Files
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Event File to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event File deleted successfully
 *       404:
 *         description: Event File not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"), deleteEventFile);

export default router;