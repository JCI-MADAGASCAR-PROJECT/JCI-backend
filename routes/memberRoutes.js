import { Router } from "express";
import {create, deleteMember, fetchAllByOrganisationLocal, update} from "../controllers/memberControllers.js";
import { uploadAvatar, addImagePathAvatar, verifyImageFile } from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/organisation-locales/members/{organisationLocalId}:
 *   get:
 *     summary: Get all Organisation Locales member by Organisation Local ID
 *     tags:
 *       - Organisation Locale Member
 *     parameters:
 *       - in: path
 *         name: organisationLocalId
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
router.get("/:organisationLocalId", fetchAllByOrganisationLocal);

/**
 * @swagger
 * /api/v1/organisation-locales/members:
 *   post:
 *     summary: Create a new Organisation Locale Member
 *     tags:
 *       - Organisation Locale Member
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
 *               title:
 *                 type: string
 *               ticket:
 *                 type: string
 *               organisationLocalId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Organisation Locale Member created successfully
 *       500:
 *         description: Server error
 */
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"), uploadAvatar,verifyImageFile, addImagePathAvatar, create);
/**
 * @swagger
 * /api/v1/organisation-locales/members/{id}:
 *   put:
 *     summary: Update an Organisation Locale Member by ID
 *     tags:
 *       - Organisation Locale Member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Organisation Locale Member to update
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
 *               title:
 *                 type: string
 *               ticket:
 *                 type: string
 *               organisationLocalId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Organisation Locale Member updated successfully
 *       404:
 *         description: Organisation Locale Member not found
 *       500:
 *         description: Server error
 */
router.put("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"), uploadAvatar,verifyImageFile, addImagePathAvatar, update);
/**
 * @swagger
 * /api/v1/organisation-locales/members/{id}:
 *   delete:
 *     summary: Delete an Organisation Locale Member by ID
 *     tags:
 *       - Organisation Locale Member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Organisation Locale Member to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organisation Locale Member deleted successfully
 *       404:
 *         description: Organisation Locale Member not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL", "ADMIN_LOCAL"), deleteMember);

export default router;