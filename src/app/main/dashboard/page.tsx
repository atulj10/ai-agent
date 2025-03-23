"use client";
import { AgentTypes } from "@/app/types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import {
  LucideMail,
  User,
  BarChart3,
  MessageSquare,
  Loader2,
  FileText,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const { data: session } = useSession();
  const [agents, setAgents] = useState<AgentTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/agent");
      setAgents(response?.data?.agents || []);
      setTimeout(() => {
        setStatsLoading(false);
      }, 400); // Simulate stats loading separately
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setLoading(false);
      setStatsLoading(false);
    }
  };

  // Expanded stats with some placeholder data for better UI
  const stats = [
    {
      title: "Total Agents",
      value: loading ? "-" : agents?.length || 0,
      icon: User,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Chats",
      value: loading ? "-" : Math.floor(Math.random() * 10),
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Documents",
      value: loading ? "-" : Math.floor(Math.random() * 20) + 5,
      icon: FileText,
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Analytics",
      value: loading ? "-" : "View",
      icon: BarChart3,
      color: "from-purple-500 to-pink-600",
    },
  ];

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="w-full p-4 md:p-6 max-w-7xl mx-auto">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#18181B] rounded-xl p-6 shadow-2xl flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-[#5147f3] animate-spin mb-4" />
            <p className="text-white font-medium">Loading dashboard...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-8">
        {/* Greeting Card */}
        <Card className="w-full bg-gradient-to-br from-[#1a1a24] to-[#121218] border border-[#2a2a35] overflow-hidden rounded-2xl shadow-xl relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#5147f3]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-32 h-32 bg-[#5147f3]/5 rounded-full blur-2xl"></div>

          <div className="relative p-6 md:p-8">
            <div className="text-white flex flex-col gap-3 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5147f3] to-[#7f73ff] tracking-tight">
                Welcome back,
              </h1>
              <p className="text-white text-xl md:text-2xl font-medium mt-1">
                {loading ? (
                  <span className="inline-block w-32 h-8 bg-gray-700/50 animate-pulse rounded"></span>
                ) : (
                  session?.user?.username || "User"
                )}
              </p>
              <p className="text-gray-300 flex items-center gap-2 text-sm md:text-base">
                <LucideMail className="w-4 h-4" />
                {loading ? (
                  <span className="inline-block w-48 h-5 bg-gray-700/50 animate-pulse rounded"></span>
                ) : (
                  session?.user?.email || "user@example.com"
                )}
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="w-full bg-[#18181B] border border-[#282A36] shadow-lg rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${item.color}`}
                  ></div>
                  <CardHeader className="flex flex-row items-center justify-between pt-5">
                    <div className="p-2 rounded-lg bg-[#282A36]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-5">
                    {statsLoading ? (
                      <div className="w-16 h-8 bg-gray-700/50 animate-pulse rounded mt-1"></div>
                    ) : (
                      <p className="text-2xl font-bold text-white">
                        {item.value}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Recent Activity
            </h2>
            <button className="text-sm text-[#5147f3] hover:text-[#7f73ff] transition-colors font-medium">
              View All
            </button>
          </div>

          {/* Recent Activity Placeholder */}
          <Card className="w-full bg-[#18181B] border border-[#282A36] overflow-hidden rounded-xl">
            {statsLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="w-2/3 h-4 bg-gray-700/50 animate-pulse rounded"></div>
                      <div className="w-1/3 h-3 bg-gray-700/30 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : agents.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {agents.slice(0, 3).map((agent, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center hover:bg-[#1d1d23] transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#5147f3] to-[#7f73ff] flex items-center justify-center text-white font-bold text-sm mr-4">
                      {agent?.name?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div>
                      <p className="text-white font-medium">{agent.name}</p>
                      <p className="text-gray-400 text-sm">
                        {agent.description || "No description"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-400">No recent activity</p>
                <button className="mt-3 px-4 py-2 bg-[#5147f3] text-white rounded-lg text-sm font-medium hover:bg-[#6155fa] transition-colors">
                  Create Your First Agent
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
