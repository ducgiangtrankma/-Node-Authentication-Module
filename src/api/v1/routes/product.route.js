import express from "express";
import { productController } from "../controllers/product.controller";
import { tokenService } from "../services/token.service";
const routes = express.Router();
routes.get(
  "/products/list",
  tokenService.verifyAccessToken,
  productController.getListProducts
);
export { routes };
