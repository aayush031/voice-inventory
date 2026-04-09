
import mongoose from "mongoose";

const commandLogSchema = new mongoose.Schema({
  commandText: String,
  action: String,
  item: String,
  quantity: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("CommandLog", commandLogSchema);
