import express from "express";
import { userController } from "../controllers/user.controller";
import { tokenService } from "../services/token.service";

const routes = express.Router();

routes.get("/user", tokenService.verifyAccessToken, userController.getListUser);

export { routes };
