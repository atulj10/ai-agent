import { ChatMessageProps } from "@/app/types/chat";


export default function ChatMessage({ userMessage, botResponse }: ChatMessageProps) {
    return (
        <div className="border p-3 rounded-md bg-gray-100">
            <p className="text-blue-500 font-semibold">You: {userMessage}</p>
            <p className="text-gray-700">Bot: {botResponse}</p>
        </div>
    );
}
