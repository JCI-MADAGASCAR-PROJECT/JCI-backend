import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendEmail } from "../controllers/emailControllers.js";


const router = Router();

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Trop de demandes. Réessayez dans 1 heure." },
});


router.post("/send", emailLimiter, sendEmail);

export default router;