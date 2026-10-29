import { Router } from "express";
import * as productControllers from "../controllers/product.controller.js";
import { createProductSchema } from "../validators/product.validator.js";
import { validateBody } from "../middlewares/validate.js";

const router = Router();

router.get("/", productControllers.getProducts);

router.get("/:id", productControllers.getProductById);

router.post(
  "/",
  validateBody(createProductSchema),
  productControllers.createProduct,
);

router.post("/where", productControllers.getProductsWhere);

export default router;
