export interface IChat extends Document {
    botId: string;
    userMessage: string;
    botResponse: string;
    timestamp: Date;
}

export interface ChatInputProps {
    onSend: (message: string) => void;
}

export interface ChatMessageProps {
    userMessage: string;
    botResponse: string;
}