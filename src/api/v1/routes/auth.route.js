import express from "express";
import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { userService } from "../services/user.service";
import { authValid } from "../validations/auth.validation";
const routes = express.Router();

routes.post(
  "/auth/register",
  authValid.registerValidate,
  authController.register
);
routes.get("/verify/:code", userController.verifyAccount);

export { routes };
