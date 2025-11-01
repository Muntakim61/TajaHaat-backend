// routes/productRoutes.js
import express from "express";
import { productController } from "../controllers/productController.js";
import { validate } from "../middlewares/validate.js";
import { productSchema } from "../validators/productValidator.js";

export const createProductRoutes = (productCollection) => {
  const router = express.Router();
  const ctrl = productController(productCollection);

  router.get("/", ctrl.getAll);
  router.get("/:id", ctrl.getById);
  router.get("/seller/:sellerNumber", ctrl.getBySellerNumber);
  router.post("/", ctrl.create);
  router.put("/:id",  ctrl.update);
  router.delete("/:id", ctrl.delete);

  return router;
};
