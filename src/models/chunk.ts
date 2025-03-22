import { IChunk } from "@/app/types/chunk.";
import mongoose, { Schema } from "mongoose";

const ChunkSchema = new Schema<IChunk>({
  agentId: { type: Schema.Types.ObjectId, required: true, ref: "Agent" },
  text: { type: String, required: true },
  embedding: { type: [Number], required: true },
  metadata: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create the Mongoose model
const ChunkModel =
  mongoose.models.Chunk || mongoose.model<IChunk>("Chunk", ChunkSchema);

export default ChunkModel;
