import express from "express";
import { routes as authRoute } from "./auth.route";
import { routes as userRoute } from "./user.route";

const routes = express.Router();

routes.use("/api/v1", authRoute);
routes.use("/api/v1", userRoute);

export { routes };
