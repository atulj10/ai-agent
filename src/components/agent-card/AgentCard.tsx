import { AgentTypes } from "@/app/types/agent";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AgentCardType {
  agent: AgentTypes;
  deleteAgent: (agentId: string) => void;
}

const AgentCard = ({ agent, deleteAgent }: AgentCardType) => {
  return (
    <Card className="group bg-[#18181B]/80 min-h-32 backdrop-blur-sm border border-[#303040] flex items-center shadow-xl rounded-xl hover:shadow-[0_0_30px_rgba(81,71,243,0.25)] p-5 transition-all duration-300 cursor-pointer h-full relative overflow-hidden hover:border-[#5147f3]/70">
      {/* Subtle glow effects */}
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#5147f3]/10 blur-xl group-hover:bg-[#5147f3]/15 transition-all duration-500"></div>
      <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full bg-[#7f73ff]/10 blur-lg group-hover:bg-[#7f73ff]/15 transition-all duration-700"></div>

      <CardHeader className="flex flex-row items-center w-full justify-between p-0 space-y-0">
        <Link
          href={`/main/agents/${agent?._id}`}
          className="flex items-center gap-4 w-full"
        >
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#5147f3] to-[#7f73ff] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#5147f3]/30 group-hover:shadow-[#5147f3]/50 transition-shadow">
            {agent?.name.charAt(0).toUpperCase()}
            <span className="absolute inset-0 rounded-full border border-white/10"></span>
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <CardTitle className="text-lg font-semibold text-white truncate group-hover:text-[#a5b4fc] transition-colors">
              {agent?.name}
            </CardTitle>
            <p className="text-sm text-gray-400 line-clamp-1 group-hover:text-gray-300 transition-colors">
              {agent?.description || "No description provided"}
            </p>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-2 rounded-lg hover:bg-[#282A36]/60 transition-colors group-hover:bg-[#282A36]/80">
              <MoreVertical className="text-gray-400 cursor-pointer hover:text-white transition-colors w-5 h-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#282A36] border border-[#303040] rounded-lg p-1 shadow-xl backdrop-blur-sm">
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer rounded-md px-3 py-2 font-medium transition-colors"
              onClick={() => deleteAgent(agent?._id as string)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
};

export default AgentCard;
