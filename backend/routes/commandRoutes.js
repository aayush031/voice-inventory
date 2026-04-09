import express from "express";
import Inventory from "../models/Inventory.js";
import CommandLog from "../models/CommandLog.js";
import { parseCommand } from "../utils/parser.js";

const router = express.Router();

/*
  POST /api/command
  Handles voice commands:
  - Add
  - Reduce
  - Update
  - View
*/
router.post("/command", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Command text is required" });
  }

  const { action, quantity, item } = parseCommand(text);

  if (!action || !item) {
    return res.status(400).json({ message: "Invalid command" });
  }

  try {
    let product = await Inventory.findOne({ name: item });

    // ADD
    if (action === "ADD") {
      if (!quantity) {
        return res.status(400).json({ message: "Quantity is required" });
      }

      if (!product) {
        product = await Inventory.create({
          name: item,
          quantity
        });
      } else {
        product.quantity += quantity;
        product.updatedAt = new Date();
        await product.save();
      }
    }

    // REDUCE
    if (action === "REDUCE") {
      if (!product) {
        return res.status(404).json({ message: "Item not found" });
      }

      if (!quantity) {
        return res.status(400).json({ message: "Quantity is required" });
      }

      product.quantity -= quantity;

      if (product.quantity < 0) {
        product.quantity = 0;
      }

      product.updatedAt = new Date();
      await product.save();
    }

    // UPDATE
    if (action === "UPDATE") {
      if (!product) {
        return res.status(404).json({ message: "Item not found" });
      }

      if (!quantity) {
        return res.status(400).json({ message: "Quantity is required" });
      }

      product.quantity = quantity;
      product.updatedAt = new Date();
      await product.save();
    }

    // VIEW
    if (action === "VIEW") {
      if (!product) {
        return res.status(404).json({ message: "Item not found" });
      }

      return res.json(product);
    }

    // Save command log
    await CommandLog.create({
      commandText: text,
      action,
      item,
      quantity
    });

    // Low stock warning
    let warning = null;
    if (product.quantity < 10) {
      warning = "⚠ Low Stock Alert!";
    }

    res.json({
      message: "Stock updated successfully",
      product,
      warning
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


/*
  GET /api/inventory
  Get all inventory items
*/
router.get("/inventory", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});


/*
  DELETE /api/reset
  Reset entire inventory + logs
*/
router.delete("/reset", async (req, res) => {
  try {
    await Inventory.deleteMany({});
    await CommandLog.deleteMany({});

    res.json({ message: "Inventory reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset inventory" });
  }
});

export default router;
