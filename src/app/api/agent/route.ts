import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/db";
import AgentModel from "@/models/agent";

export async function GET() {
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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: error,
      },
      { status: 500 }
    );
  }
}
