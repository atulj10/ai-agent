import { IChat } from "@/app/types/chat";
import mongoose, { Schema, Document } from "mongoose";

const ChatSchema = new Schema<IChat>({
  botId: { type: String, required: true },
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatModel = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);

export default ChatModel;
