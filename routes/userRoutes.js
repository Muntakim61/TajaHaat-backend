import express from "express";
import { userController } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../validators/userValidator.js";

export const createUserRoutes = (usersCollection) => {
  const router = express.Router();
  const ctrl = userController(usersCollection);

  router.get("/", ctrl.getAll);
  router.get("/:id", ctrl.getById);
  router.post("/",  ctrl.create);
  router.put("/:id",   ctrl.update);
  router.delete("/:id", ctrl.delete);

  return router;
};
