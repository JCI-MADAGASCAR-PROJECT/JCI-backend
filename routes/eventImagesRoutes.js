import { Router } from "express";
import { 
            create, 
            deleteEventImage,
            fetchAllByEventId
        } from "../controllers/eventImagesControllers.js";
import { addImagePathEvents, uploadEvent } from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/events/images/{eventId}:
 *   get:
 *     summary: Get all images for a specific event by Event ID
 *     tags:
 *       - Event Images
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the Event to fetch images for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Event Images
 *       500:
 *         description: Server error
 */
router.get("/:eventId",fetchAllByEventId);

/**
 * @swagger
 * /api/v1/events/images:
 *   post:
 *     summary: Create a new Event Image
 *     tags:
 *       - Event Images
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imgUrl:
 *                 type: string
 *               eventId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Event Image created successfully
 *       500:
 *         description: Server error
 */
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"), uploadEvent,addImagePathEvents, create);

/**
 * @swagger
 * /api/v1/events/images/{id}:
 *   delete:
 *     summary: Delete an Event Image by ID
 *     tags:
 *       - Event Images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Event Image to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event Image deleted successfully
 *       404:
 *         description: Event Image not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"), deleteEventImage);

export default router;