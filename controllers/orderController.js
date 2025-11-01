import { ObjectId } from "mongodb";
import { orderSchema } from "../validators/orderValidator.js";

export const orderController = (ordersCollection) => ({
  getAll: async (req, res) => {
    try {
      const orders = await ordersCollection.find().toArray();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.status(200).json(order);
    } catch {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  },
  getOrdersBySellerNumber: async (req, res) => {
    const sellerNumber = req.params.sellerNumber;

    if (!sellerNumber) {
      return res.status(400).json({ error: "Seller number is required" });
    }

    try {
      const orders = await ordersCollection.find({ sellerNumber }).toArray();

      if (!orders.length) {
        return res.status(200).json({ error: "No orders found for this seller" });
      }

      res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching orders by sellerNumber:", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },

  create: async (req, res) => {
    const { error, value } = req.body;
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const result = await ordersCollection.insertOne(value);
      res.status(201).json(result);
    } catch {
      res.status(500).json({ error: "Failed to create order" });
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
