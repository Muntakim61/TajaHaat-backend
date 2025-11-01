import { ObjectId } from "mongodb";
import { userSchema } from "../validators/userValidator.js";

export const userController = (usersCollection) => ({
  getAll: async (req, res) => {
    try {
      const users = await usersCollection.find().toArray();
      res.status(200).json(users);
    } catch {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user);
    } catch {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  create: async (req, res) => {
    try {
      const user = { ...req.body };

      // Optional: normalize email if provided
      if (user.email) user.email = user.email.toLowerCase();

      const result = await usersCollection.insertOne(user);
      res.status(201).json({ message: "User created successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create user", details: error.message });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );

      if (result.matchedCount === 0)
        return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update user", details: error.message });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    try {
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete user", details: error.message });
    }
  },
});
