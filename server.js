import "dotenv/config";
import express from "express"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import routes from "./routes/index.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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