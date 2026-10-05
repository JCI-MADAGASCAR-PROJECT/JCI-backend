import { Router } from "express";
import { 
            create, 
            createNational, 
            deleteEvent, 
            fetchAllEvents, 
            fetchAllActuEvents,
            fetchAllEventsByOrganisationLocal, 
            fetchAllEventsByNational,
            update,
            fetchEventById
        } from "../controllers/eventControllers.js";
import { 
            uploadEvent, 
            addImagePathEvents ,
            verifyImageFile,
            uploadEventToOvh
        } from "../middleware/uploadMiddleware.js";
import { protect, authorize, requireOrganisationAccess } from "../middleware/authMiddleware.js";
import prisma from "../DB/db.config.js";

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
 * /api/v1/events/actu:
 *   get:
 *     summary: Get the latest 4 events
 *     tags:
 *       - Event
 *     parameters: []
 *     responses:
 *       200:
 *         description: List of latest 4 events
 *       500:
 *         description: Server error
 */
router.get("/actu", fetchAllActuEvents);

/**
 * @swagger
 * /api/v1/events/organisation-locales/{organisationLocalId}:
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
 * /api/v1/events/details/{eventId}:
 *   get:
 *     summary: Get an event by ID
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the Event to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *       500:
 *         description: Server error
 */
router.get("/details/:eventId", fetchEventById);

/**
 * @swagger
 * /api/v1/events/national:
 *   get:
 *     summary: Get all events by National
 *     tags:
 *       - Event
 *     parameters: []
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/national",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), fetchAllEventsByNational);
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
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"),
            requireOrganisationAccess(async (req) => Number(req.body.organisationLocalId)),
            uploadEvent,verifyImageFile, uploadEventToOvh, addImagePathEvents ,create);
            
router.post("/national",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"),
            requireOrganisationAccess(async (req) => Number(req.body.organisationLocalId)),
            uploadEvent,verifyImageFile, uploadEventToOvh, addImagePathEvents ,createNational);
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
router.put("/:id/organisation-local/:organisationLocalId",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"),uploadEvent,verifyImageFile, uploadEventToOvh,
            requireOrganisationAccess(async (req) => Number(req.params.organisationLocalId)),
             addImagePathEvents, update);
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
router.delete("/:id/organisation-local/:organisationLocalId",
    protect,
    authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"),
    requireOrganisationAccess(async (req) => {
        // Charger l'organisationLocalId de l'event pour vérifier le droit
        const event = await prisma.event.findUnique({
            where: { id: Number(req.params.id) },
            select: { organisationLocalId: true },
        });
        return event?.organisationLocalId ?? null;
    }),
    deleteEvent);

export default router;