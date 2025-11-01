import { ObjectId } from "mongodb";
import { productSchema } from "../validators/productValidator.js";

export const productController = (productCollection) => ({
  getAll: async (req, res) => {
    try {
      const result = await productCollection.find().toArray();
      console.log("GET /product route hit"); 
      console.log(result);
      res.status(200).send(result);
    } catch {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await productCollection.findOne({ _id: new ObjectId(id) });
      if (!result) return res.status(404).json({ error: "Product not found" });
      res.status(200).send(result);
    } catch {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },

  create: async (req, res) => {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const result = await productCollection.insertOne(value);
      res.status(201).send(result);
    } catch {
      res.status(500).json({ error: "Failed to add product" });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: value }
      );
      if (result.matchedCount === 0)
        return res.status(404).json({ error: "Product not found" });
      res.status(200).json({ message: "Product updated successfully" });
    } catch {
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
});
