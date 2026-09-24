import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logOut, reAuth } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Trop de tentatives. Réessayez plus tard." }
});

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get the authenticated user's details
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Authenticated user's details
 *       500:
 *         description: Server error
 */
router.get("/me",protect,reAuth);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
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
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login",loginLimiter,login)

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout the authenticated user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Server error
 */
router.post("/logout",logOut);

export default router;