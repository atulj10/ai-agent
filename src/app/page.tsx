"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";

export default function Home() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSend = async (message: string) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setMessages([...messages, { user: message, bot: data.response }]);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Gemini Chatbot</h1>
      <div className="w-full max-w-md space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} userMessage={msg.user} botResponse={msg.bot} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
