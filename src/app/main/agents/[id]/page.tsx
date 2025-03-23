"use client";
import { AgentTypes } from "@/app/types/agent"; // Import IChat interface
import { IChat } from "@/app/types/chat";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Send } from "lucide-react"; // Import back arrow and send icons
import axios from "axios";

const Chat = () => {
  const { id } = useParams();
  const router = useRouter(); // Router for navigation
  const [details, setDetails] = useState<AgentTypes>({} as AgentTypes);
  const [chats, setChats] = useState<IChat[]>([]); // State to store chats
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [message, setMessage] = useState<string>(""); // State for the input message
  const [isSending, setIsSending] = useState<boolean>(false); // State for sending message
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container

  const fetchAgentAndChats = async () => {
    try {
      setLoading(true);

      // Fetch agent details
      const agentResponse = await fetch(`/api/agent/${id}`);
      const agentData = await agentResponse.json();
      setDetails(agentData.agent);

      // Fetch chats for the agent
      const chatsResponse = await fetch(`/api/agent/chat/${id}`);
      const chatsData = await chatsResponse.json();
      setChats(chatsData.chats);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages
    setIsSending(true);

    try {
      // Send the message to the API
      const response = await axios.post("/api/chat", {
        query: message,
        agentId: id as string,
      });

      const data = response.data;

      if (data.answer) {
        // Add the new chat to the chat history
        const newChat: IChat = {
          _id: Date.now().toString(), // Temporary ID
          botId: id as string,
          userMessage: message,
          botResponse: data.answer,
          createdAt: new Date(),
        };

        setChats((prevChats) => [...prevChats, newChat]);
        setMessage(""); // Clear the input
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Scroll to the bottom of the chat container whenever chats are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  // Fetch agent and chats on component mount
  useEffect(() => {
    fetchAgentAndChats();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1E1E2F]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5147f3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-white p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-[#5147f3] hover:text-[#4038d1] transition-colors mb-4 sm:mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      {/* Agent Details Section */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#5147f3]">
          {details?.name}
        </h1>
        <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
          {details?.description}
        </p>
      </div>

      {/* Chat Section */}
      <div className="max-w-4xl mx-auto bg-[#282A36] rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#5147f3] mb-4 sm:mb-6">
          Chat History
        </h2>

        {/* Chat List */}
        <div
          ref={chatContainerRef}
          className="space-y-4 mb-4 sm:mb-6 h-[60vh] overflow-y-auto "
          style={{ scrollbarWidth: "none" }}
        >
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div key={chat._id} className="flex flex-col space-y-2">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#5147f3] text-white rounded-lg p-2 sm:p-3 max-w-[80%] sm:max-w-[70%]">
                    {chat.userMessage}
                  </div>
                </div>

                {/* Bot Response */}
                <div className="flex justify-start">
                  <div className="bg-[#1E1E2F] text-white rounded-lg p-2 sm:p-3 max-w-[80%] sm:max-w-[70%] overflow-x-auto">
                    {chat.botResponse}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-500 text-center mt-1 sm:mt-2">
                  {new Date(chat?.createdAt as Date).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No chats found.</div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-6">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 sm:p-3 rounded-lg bg-[#1E1E2F] text-white border border-gray-600 focus:outline-none focus:border-[#5147f3] focus:ring-1 focus:ring-[#5147f3] transition-colors text-sm sm:text-base"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSending) {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isSending || !message.trim()}
            className="p-2 sm:p-3 bg-[#5147f3] text-white rounded-lg hover:bg-[#4038d1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
