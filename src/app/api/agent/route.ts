import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/db";
import AgentModel from "@/models/agent";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const agents = await AgentModel.find({ userId: session?.user?._id });

    return NextResponse.json(
      {
        success: true,
        message: "Agents fetched successfully!",
        agents: agents,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
