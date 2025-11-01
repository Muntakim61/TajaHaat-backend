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
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await productCollection.findOne({ _id: new ObjectId(id) });
      if (!result) return res.status(404).json({ error: "Product not found" });
      res.status(200).send(result);
    } catch {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },
  getBySellerNumber: async (req, res) => {
    const sellerNumber = req.params.sellerNumber;

    if (!sellerNumber) {
      return res.status(400).json({ error: "Seller number is required" });
    }

    try {
      const products = await productCollection.find({ sellerNumber }).toArray();

      if (!products.length) {
        return res
          .status(404)
          .json({ error: "No products found for this seller" });
      }

      res.status(200).json(products);
    } catch (err) {
      console.error("Error fetching products by sellerNumber:", err);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  create: async (req, res) => {
    try {
      const result = await productCollection.insertOne(req.body);
      res.status(201).json({ message: "Product created successfully", result });
    } catch (error) {
      res.status(500).json({ error: "Failed to create product", details: error.message });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body } // no validation
      );

      if (result.matchedCount === 0)
        return res.status(404).json({ error: "Order not found" });

      res.status(200).json({ message: "Order updated successfully" });
    } catch (err) {
      console.error("Failed to update order:", err);
      res.status(500).json({ error: "Failed to update order" });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await ordersCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Order not found" });

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      console.error("Failed to delete order:", err);
      res.status(500).json({ error: "Failed to delete order" });
    }
  },
});
