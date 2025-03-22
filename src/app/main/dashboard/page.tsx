"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivitySquare,
  LucideMail,
  PanelTopInactive,
  User,
  UserPlus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
const stats = [
  { title: "Total Agents", value: 10, icon: User },
  { title: "Active Agents", value: 8, icon: ActivitySquare },
  { title: "Inactive Agents", value: 2, icon: PanelTopInactive },
  { title: "New Registrations", value: 3, icon: UserPlus },
];

function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {/* Greeting */}
      <div className="text-white flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-[#5147f3]">Welcome back,</h1>
        <p className="text-white text-2xl">{session?.user?.username}</p>
        <p className="text-gray-300 flex items-center gap-2">
          <LucideMail className="w-4 h-4" />
          {session?.user?.email}
        </p>
      </div>

      <hr className="my-4 border-gray-700 w-full" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="w-full bg-[#18181B] border border-[#282A36] shadow-xl rounded-xl p-5 hover:scale-[1.05] transition-transform"
            >
              <CardHeader className="flex flex-row flex-wrap items-center justify-between">
                <Icon className="h-8 w-8 text-[#5147f3]" />
                <CardTitle className="text-lg font-bold text-gray-300">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
