import { Types } from "mongoose";

export interface AgentTypes extends Document {
  name: string;
  description: string;
  userId: Types.ObjectId;
  timestamp: Date;
}
