import { Types } from "mongoose";

export interface AgentTypes extends Document {
  _id?:string,
  name: string;
  description: string;
  userId: Types.ObjectId;
  timestamp: Date;
}

export interface NewAgentTypes extends Document {
  name: string;
  description: string;
}
