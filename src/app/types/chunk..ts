import { Schema, Types } from "mongoose";

export interface IChunk extends Document {
  agentId: Types.ObjectId;
  text: string;
  embedding: number[];
  metadata: {
    fileName: string;
  };
  timestamp: Date;
}
