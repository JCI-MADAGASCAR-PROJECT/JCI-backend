import { Router } from "express";
import { create, deleteUser, fetchAll, fetchUser, update, updatePassword } from "../controllers/userControllers.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"),fetchAll);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protect, authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), fetchUser);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               ol_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
router.post("/",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), create);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"),update);

/**
 * @swagger
 * /api/v1/users/{id}/password:
 *   put:
 *     summary: Update a user's password by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update the password for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id/password",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"), updatePassword);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",protect,authorize("SUPER_ADMIN", "ADMIN_NATIONAL"),deleteUser);

export default router;