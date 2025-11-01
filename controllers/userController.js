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
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    value.email = value.email.toLowerCase();
    try {
      // Check for duplicate email or phone
      const existingUser = await usersCollection.findOne({
        $or: [{ email: value.email }, { phoneNumber: value.phoneNumber }],
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "User with this email or phone already exists" });
      }

      const result = await usersCollection.insertOne(value);
      res.status(201).json(result);
    } catch {
      res.status(500).json({ error: "Failed to create user" });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: value }
      );
      if (result.matchedCount === 0)
        return res.status(404).json({ error: "User not found" });
      res.status(200).json({ message: "User updated successfully" });
    } catch {
      res.status(500).json({ error: "Failed to update user" });
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
    } catch {
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
});
