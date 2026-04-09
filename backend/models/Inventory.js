
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: "units" },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Inventory", inventorySchema);
