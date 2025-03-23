"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  MoreVertical,
  X,
  Upload,
  FileText,
  Trash,
} from "lucide-react";
import axios from "axios";
import { AgentTypes } from "@/app/types/agent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AgentsSection() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [agents, setAgents] = useState<AgentTypes[]>([]);
  const [newAgent, setNewAgent] = useState<{
    name: string;
    description: string;
    file: File | null;
    fileType: string;
  }>({
    name: "",
    description: "",
    file: null,
    fileType: "pdf",
  });
  const [activeTab, setActiveTab] = useState("details");
  const [createdAgent, setCreatedAgent] = useState<AgentTypes | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setNewAgent((prev) => ({ ...prev, file }));
    }
  };

  const handleCreateAgent = async () => {
    try {
      const response = await axios.post("/api/agent/create", {
        name: newAgent.name,
        description: newAgent.description,
      });
      setCreatedAgent(response?.data?.newAgent);
      setActiveTab("upload");
    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  const uploadPDF = async () => {
    if (!newAgent.file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", newAgent.file);
      formData.append("agentId", createdAgent?._id || "");

      const response = await axios.post("/api/pdf-loader", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      setIsModalOpen(false);
      // Refresh agents list
      fetchAgents();
    } catch (error) {
      console.error("Error uploading PDF:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get("/api/agent");
      setAgents(response?.data?.agents || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      await axios.delete(`/api/agent/delete`, {
        data: { agentId }, // Send agentId in the request body
      });
      // Refresh the agents list after deletion
      fetchAgents();
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const resetModal = () => {
    setIsModalOpen(false);
    setNewAgent({
      name: "",
      description: "",
      file: null,
      fileType: "pdf",
    });
    setActiveTab("details");
    setCreatedAgent(null);
    setFileName("");
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-b from-[#15151a] to-[#121218]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-[#5147f3] to-[#7f73ff] text-transparent">
          Agents
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
        {agents?.map((agent) => (
          <Card
            key={agent?._id}
            className="bg-[#18181B]/80 backdrop-blur-sm border border-[#303040] flex items-center shadow-xl rounded-2xl hover:shadow-[0_0_20px_rgba(81,71,243,0.15)] p-6 hover:scale-[1.03] transition-all duration-300 cursor-pointer h-full relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#5147f3]/10 blur-2xl"></div>
            <CardHeader className="flex flex-row items-center w-full justify-between p-0 space-y-0">
              <Link
                href={`/main/agents/${agent?._id}`}
                className="flex items-center gap-4 w-full"
              >
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#5147f3] to-[#7f73ff] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#5147f3]/20">
                  {agent?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-white">
                    {agent?.name}
                  </CardTitle>
                  <p className="text-sm text-gray-400 line-clamp-1 mt-1">
                    {agent?.description || "No description"}
                  </p>
                </div>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 rounded-full hover:bg-[#282A36]/60 transition-colors">
                    <MoreVertical className="text-gray-400 cursor-pointer hover:text-white transition-colors w-5 h-5" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#282A36] border border-gray-600 rounded-xl p-1 shadow-xl">
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer rounded-lg px-3 py-2 font-medium"
                    onClick={() => deleteAgent(agent?._id as string)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
          </Card>
        ))}

        <Card
          onClick={() => setIsModalOpen(true)}
          className="bg-[#282A36]/50 border border-dashed border-[#5147f3]/40 shadow-lg rounded-2xl p-6 flex items-center justify-center cursor-pointer hover:bg-[#2e303e]/60 hover:scale-[1.05] transition-all duration-300 h-full relative overflow-hidden group"
        >
          <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#5147f3]/10 blur-2xl group-hover:bg-[#5147f3]/20 transition-all duration-300"></div>
          <div className="flex flex-col items-center text-gray-400">
            <div className="h-14 w-14 rounded-full bg-[#5147f3]/20 flex items-center justify-center group-hover:bg-[#5147f3]/30 transition-all duration-300 shadow-inner">
              <UserPlus className="h-7 w-7 text-[#6c63ff] group-hover:scale-110 transition-all duration-300" />
            </div>
            <p className="mt-4 text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
              Add Agent
            </p>
          </div>
        </Card>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={resetModal}
        >
          <div
            className="bg-[#18181B] p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-[#303040] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#282A36] transition-colors"
              onClick={resetModal}
            >
              <X className="h-5 w-5" />
            </button>

            <Tabs value={activeTab} className="w-full">
              <TabsList className="flex w-full bg-[#131314] rounded-xl overflow-hidden mb-8 p-1 border-b border-gray-700">
                <TabsTrigger
                  value="details"
                  className={`flex-1 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "details"
                      ? "bg-gradient-to-r from-[#5147f3] to-[#6c63ff] font-medium shadow-lg"
                      : "hover:bg-[#282A36] hover:text-gray-200"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-80"
                  >
                    <path
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Details
                </TabsTrigger>

                <TabsTrigger
                  value="upload"
                  className={`flex-1 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    !createdAgent
                      ? "opacity-50 cursor-not-allowed"
                      : activeTab === "upload"
                      ? "bg-gradient-to-r from-[#5147f3] to-[#6c63ff] font-medium shadow-lg"
                      : "hover:bg-[#282A36] hover:text-gray-200"
                  }`}
                  disabled={!createdAgent}
                  onClick={() => setActiveTab("upload")}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-80"
                  >
                    <path
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-5">
                <h3 className="text-xl font-bold text-white bg-clip-text bg-gradient-to-r from-[#5147f3] to-[#7f73ff] text-transparent">
                  Create Agent
                </h3>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAgent.name}
                    onChange={handleInputChange}
                    placeholder="Enter agent name"
                    className="w-full p-3 rounded-xl bg-[#282A36] text-white border border-gray-600 focus:outline-none focus:border-[#5147f3] focus:ring-1 focus:ring-[#5147f3] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newAgent.description}
                    onChange={handleInputChange}
                    placeholder="Enter agent description"
                    rows={3}
                    className="w-full p-3 rounded-xl bg-[#282A36] text-white border border-gray-600 focus:outline-none focus:border-[#5147f3] focus:ring-1 focus:ring-[#5147f3] transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleCreateAgent}
                  disabled={!newAgent.name}
                  className={`w-full mt-6 bg-gradient-to-r from-[#5147f3] to-[#6c63ff] text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-[#5147f3]/20 transition-all font-medium ${
                    !newAgent.name ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Continue
                </button>
              </TabsContent>

              <TabsContent value="upload" className="space-y-5">
                <h3 className="text-xl font-bold text-white bg-clip-text bg-gradient-to-r from-[#5147f3] to-[#7f73ff] text-transparent">
                  Upload Knowledge
                </h3>

                <div className="flex space-x-4 mb-4">
                  <select
                    name="fileType"
                    value={newAgent.fileType}
                    onChange={handleInputChange}
                    className="p-3 rounded-xl bg-[#282A36] text-white border border-gray-600 focus:outline-none focus:ring-1 focus:border-[#5147f3] focus:ring-[#5147f3]"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="excel">Excel Sheet</option>
                    <option value="link">Web Link</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-[#5147f3] transition-colors bg-[#282A36]/30 group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                    accept={
                      newAgent.fileType === "pdf" ? ".pdf" : ".xlsx,.xls,.csv"
                    }
                  />

                  {!fileName ? (
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <div className="h-16 w-16 rounded-full bg-[#5147f3]/10 flex items-center justify-center mb-4 group-hover:bg-[#5147f3]/20 transition-all">
                        <Upload className="h-8 w-8 text-[#6c63ff] group-hover:scale-110 transition-all" />
                      </div>
                      <p className="text-gray-300 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {newAgent.fileType === "pdf"
                          ? "PDF"
                          : newAgent.fileType === "excel"
                          ? "Excel"
                          : "URL"}
                        {newAgent.fileType !== "link" && " file"}
                      </p>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-[#5147f3]/20 flex items-center justify-center mr-4">
                          <FileText className="h-6 w-6 text-[#6c63ff]" />
                        </div>
                        <div className="text-left">
                          <p className="text-gray-300 font-medium truncate max-w-xs">
                            {fileName}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            Ready to upload
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFileName("");
                          setNewAgent((prev) => ({ ...prev, file: null }));
                        }}
                        className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#282A36]"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={uploadPDF}
                  disabled={!newAgent.file || isUploading}
                  className={`w-full mt-6 bg-gradient-to-r from-[#5147f3] to-[#6c63ff] text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-[#5147f3]/20 transition-all font-medium flex items-center justify-center ${
                    !newAgent.file || isUploading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
