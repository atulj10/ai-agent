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
    <Card className="bg-[#18181B]/80 min-h-28 backdrop-blur-sm border border-[#303040] flex items-center shadow-xl rounded-2xl hover:shadow-[0_0_20px_rgba(81,71,243,0.15)] p-4 sm:p-5 md:p-6 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-[1.05] transition-all duration-300 cursor-pointer h-full relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#5147f3]/10 blur-2xl"></div>
      <CardHeader className="flex flex-row items-center w-full justify-between p-0 space-y-0">
        <Link
          href={`/main/agents/${agent?._id}`}
          className="flex items-center gap-3 sm:gap-4 w-full"
        >
          <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-[#5147f3] to-[#7f73ff] flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md shadow-[#5147f3]/20">
            {agent?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg font-semibold text-white truncate">
              {agent?.name}
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mt-1">
              {agent?.description || "No description"}
            </p>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-1 sm:p-2 rounded-full hover:bg-[#282A36]/60 transition-colors">
              <MoreVertical className="text-gray-400 cursor-pointer hover:text-white transition-colors w-4 h-4 sm:w-5 sm:h-5" />
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
  );
};

export default AgentCard;
