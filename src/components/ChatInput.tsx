import { ChatInputProps } from "@/app/types/chat";
import { useState } from "react";


export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex w-full max-w-md mt-4">
      <input
        className="border p-2 flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Send
      </button>
    </div>
  );
}
