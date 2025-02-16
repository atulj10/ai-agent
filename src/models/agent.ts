import { AgentTypes } from "@/app/types/agent";
import mongoose, { Schema } from "mongoose";

const AgentSchema = new Schema<AgentTypes>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

const AgentModel =
  mongoose.models.Agent || mongoose.model<AgentTypes>("Agent", AgentSchema);

export default AgentModel;
