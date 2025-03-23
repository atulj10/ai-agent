export interface IChat {
  _id?: string;
  botId: string;
  userMessage: string;
  botResponse: string;
  createdAt?: Date;
  timestamp?: Date;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
}

export interface ChatMessageProps {
  userMessage: string;
  botResponse: string;
}
