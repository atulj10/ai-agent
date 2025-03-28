import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AgentModel from "@/models/agent";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ChatModel from "@/models/chat";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const agent = await AgentModel.findOne({
      _id: id,
      userId: session.user._id,
    });

    if (!agent) {
      return NextResponse.json(
        { success: false, message: "Agent not found" },
        { status: 404 }
      );
    }

    const chats = await ChatModel.find({ botId: id }).sort({
      timestamp: -1,
    });

    return NextResponse.json(
      { success: true, message: "Agent fetched successfully!", chats: chats },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
