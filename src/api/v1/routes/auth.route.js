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
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 unique: true
 *                 require: true
 *               password:
 *                 type: string
 *                 format: password
 *                 require: true
 *                 minLength: 8
 *                 maxLength: 32
 *                 description: Mật khẩu phải chứa ít nhất 8 kí tự, tối đa 32 kí tự, bao gồm chữ hoa, chữ thường, số, kí tự đặc biệt
 *               gender:
 *                 type: string
 *                 enum: ["Male", "Female", "Other"]
 *             example:
 *               email: example@gmail.com
 *               password: Abcd@123
 *               gender: Female
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
