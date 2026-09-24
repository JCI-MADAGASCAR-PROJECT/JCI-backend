import { Router } from "express";
import { sendEmail } from "../controllers/emailControllers.js";


const router = Router();


router.post("/send", sendEmail);

export default router;