// routes/productRoutes.js
import express from "express";
import { productController } from "../controllers/productController.js";
import { validate } from "../middlewares/validate.js";
import { productSchema } from "../validators/productValidator.js";

export const createProductRoutes = (agroCollection) => {
  const router = express.Router();
  const ctrl = productController(agroCollection);

  router.get("/", ctrl.getAll);
  router.get("/:id", ctrl.getById);
  router.post("/", validate(productSchema), ctrl.create);
  router.put("/:id", validate(productSchema), ctrl.update);
  router.delete("/:id", ctrl.delete);

  return router;
};
