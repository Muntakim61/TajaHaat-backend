import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { createProductRoutes } from "./routes/productRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const db = await connectDB();
  const agroCollection = db.collection("products");
  app.use("/product", createProductRoutes(agroCollection));

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();