"use client"
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserPlus, MoreVertical, X } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";

const agents = [
  { id: 1, name: "John Doe", role: "Senior Agent", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jane Smith", role: "Junior Agent", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Michael Brown", role: "Lead Agent", avatar: "https://i.pravatar.cc/150?img=3" },
];

export default function AgentsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", description: "", file: null, fileType: "pdf" });
  const session = useSession();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAgent((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e: any) => {
    setNewAgent((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleCreateAgent = async () => {
    // console.log("Agent Created:", newAgent);
    const response = await axios.post('/api/agent/create', {
      name: newAgent.name,
      description: newAgent.description
    });


    setIsModalOpen(false);
    setNewAgent({ name: "", description: "", file: null, fileType: "Image" });
  };

  useEffect(() => {
    const fetchAgents = async () => {
      const response = await axios.get('/api/agent');
      console.log(response);
    }

    fetchAgents();
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Agents</h2>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5147f3] text-white px-4 py-2 rounded-lg hover:bg-[#4038d1] transition"
        >
          Add Agent
        </button> */}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="bg-[#18181B] border border-[#282A36] shadow-lg rounded-xl p-5 hover:scale-[1.03] transition-transform">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={agent.avatar} alt={agent.name} className="h-12 w-12 rounded-full border border-gray-600" />
                <div>
                  <CardTitle className="text-lg font-medium text-white">{agent.name}</CardTitle>
                  <p className="text-sm text-gray-400">{agent.role}</p>
                </div>
              </div>
              <MoreVertical className="text-gray-500 cursor-pointer" />
            </CardHeader>
            {/* <CardContent>
              <span className={`text-sm px-3 py-1 rounded-full ${agent.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                {agent.status}
              </span>
            </CardContent> */}
          </Card>
        ))}

        {/* Create Agent Card */}
        <Card
          onClick={() => setIsModalOpen(true)}
          className="bg-[#282A36] border border-dashed border-gray-500 shadow-lg rounded-xl p-5 flex items-center justify-center cursor-pointer hover:scale-[1.05] transition-transform"
        >
          <div className="flex flex-col items-center text-gray-400">
            <UserPlus className="h-10 w-10 text-[#5147f3]" />
            <p className="mt-2 text-lg font-medium">Add Agent</p>
          </div>
        </Card>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#18181B] p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" onClick={() => setIsModalOpen(false)}>
              <X />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Create Agent</h3>

            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newAgent.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#282A36] text-white border border-gray-500 focus:outline-none focus:border-[#5147f3]"
            />

            <label className="block text-gray-300 mt-4 mb-2">Description</label>
            <textarea
              name="description"
              value={newAgent.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#282A36] text-white border border-gray-500 focus:outline-none focus:border-[#5147f3]"
            />

            <div className="flex items-center mt-4">
              <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
              <label htmlFor="fileUpload" className="bg-[#5147f3] text-white px-4 py-2 rounded-lg cursor-pointer">
                Upload File
              </label>

              <select
                name="fileType"
                value={newAgent.fileType}
                onChange={handleInputChange}
                className="ml-4 p-2 rounded bg-[#282A36] text-white border border-gray-500 focus:outline-none focus:border-[#5147f3]"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="link">Link</option>
              </select>
            </div>

            <button
              onClick={handleCreateAgent}
              className="w-full mt-6 bg-[#5147f3] text-white px-4 py-2 rounded-lg hover:bg-[#4038d1] transition"
            >
              Create Agent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
