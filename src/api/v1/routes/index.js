import express from "express";
import { routes as authRoute } from "./auth.route";

const routes = express.Router();

routes.use("/api/v1", authRoute);
export { routes };
