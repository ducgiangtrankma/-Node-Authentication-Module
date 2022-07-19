import express from "express";
import { routes as authRoute } from "./auth.route";
import { routes as userRoute } from "./user.route";
import { router as docsRoute } from "./docs.route";
import { routes as productRoute } from "./product.route";
const routes = express.Router();

routes.use("/api/v1", authRoute);
routes.use("/api/v1", userRoute);
routes.use("/api/v1", docsRoute);
routes.use("/api/v1", productRoute);

export { routes };
