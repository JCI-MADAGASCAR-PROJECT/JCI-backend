import "dotenv/config";
import express from "express"
import cors from 'cors'; // Importe CORS
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

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100, // max requests
//   message: "Too many requests, try later",
// });

app.use(helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use(routes);
if (process.env.NODE_ENV !== "production") {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );
}

app.get("/",(req, res) =>{res.send("heyy ...!")})

app.listen(PORT,()=>{console.log("working on http://localhost:"+PORT)});