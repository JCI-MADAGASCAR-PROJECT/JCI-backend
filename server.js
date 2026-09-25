import "dotenv/config";
import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from "./routes/index.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Trop de requêtes. Réessayez plus tard." },
});

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/api/v1/", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

const server = app.listen(PORT, () => {
  console.log(`JCI Backend démarré sur le port ${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Serveur arrêté proprement.");
    process.exit(0);
  });
});