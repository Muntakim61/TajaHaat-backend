import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { createProductRoutes } from "./routes/productRoutes.js";
import { createOrderRoutes } from "./routes/orderRoutes.js";
import { createUserRoutes } from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const db = await connectDB();
  const productCollection = db.collection("products");
  const ordersCollection = db.collection("orders");
  const usersCollection = db.collection("users");
  app.use("/product", createProductRoutes(productCollection));
  app.use("/orders", createOrderRoutes(ordersCollection));
  app.use("/user", createUserRoutes(usersCollection));
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
