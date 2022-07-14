import express from "express";
import { authController } from "../controllers/auth.controller";
import { authValid } from "../validations/auth.validation";
const routes = express.Router();

routes.post(
  "/auth/register",
  authValid.registerValidate,
  authController.register
);

export { routes };
