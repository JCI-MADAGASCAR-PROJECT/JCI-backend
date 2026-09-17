import { Router } from "express";
import { 
            create, 
            deleteEvent, 
            fetchAllEvents, 
            fetchAllEventsByOrganisationLocal, 
            fetchAllEventsByNational,
            update 
        } from "../controllers/eventControllers.js";
import { uploadEvent, addImagePathEvents } from "../middleware/uploadMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Event
 *     parameters: []
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/",fetchAllEvents);

/**
 * @swagger
 * /api/v1/events/{organisationLocalId}:
 *   get:
 *     summary: Get all events by Organisation Local ID
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: organisationLocalId
 *         required: true
 *         description: ID of the Organisation Locale to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/organisation-locales/:organisationLocalId",fetchAllEventsByOrganisationLocal);

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events by National ID
 *     tags:
 *       - Event
 *     parameters: []
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/national", fetchAllEventsByNational);
/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Create a new Event
 *     tags:
 *       - Event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *               organisationLocalId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Server error
 */
router.post("/", uploadEvent, addImagePathEvents ,create);
/**
 * @swagger
 * /api/v1/events/{id}:
 *   put:
 *     summary: Update an Event by ID
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *               organisationLocalId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.put("/:id", uploadEvent, addImagePathEvents, update);
/**
 * @swagger
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete an Event by ID
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",deleteEvent);

export default router;