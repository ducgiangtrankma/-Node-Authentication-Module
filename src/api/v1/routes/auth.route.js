import express from "express";
import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";
import { authValid } from "../validations/auth.validation";
const routes = express.Router();

routes.post(
  "/auth/register",
  authValid.registerValidate,
  authController.register
);
routes.get("/verify/:code", userController.verifyAccount);

routes.post("/auth/login", authValid.loginValidate, authController.login);

routes.post(
  "/auth/refresh-tokens",
  tokenService.verifyRefreshToken,
  authController.refreshToken
);

routes.post(
  "/auth/logout",
  tokenService.verifyRefreshToken,
  authController.logout
);

export { routes };
