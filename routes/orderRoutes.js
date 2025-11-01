import express from "express";
import { orderController } from "../controllers/orderController.js";
import { validate } from "../middlewares/validate.js";
import { orderSchema } from "../validators/orderValidator.js";

export const createOrderRoutes = (ordersCollection) => {
  const router = express.Router();
  const ctrl = orderController(ordersCollection);

  router.get("/", ctrl.getAll);
  router.get("/:id", ctrl.getById);
  router.post("/", validate(orderSchema), ctrl.create);
  router.put("/:id", validate(orderSchema), ctrl.update);
  router.delete("/:id", ctrl.delete);

  return router;
};
