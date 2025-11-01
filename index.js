import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { createProductRoutes } from "./routes/productRoutes.js";
import { createOrderRoutes } from "./routes/orderRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const db = await connectDB();
   const agroCollection = db.collection("products");
  const ordersCollection = db.collection("orders");
  app.use("/product", createProductRoutes(agroCollection));
  app.use("/orders", createOrderRoutes(ordersCollection));

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();