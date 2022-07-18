import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerDef } from "../docs/swaggerDef";
const swaggerDefinition = swaggerDef;
const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/api/v1/docs/*.yml", "src/api/v1/routes/*.js"],
});
router.use("/docs", swaggerUi.serve);

router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

export { router };
