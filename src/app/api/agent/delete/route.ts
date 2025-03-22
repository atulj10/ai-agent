import connectDB from "@/lib/db";
import AgentModel from "@/models/agent";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ChunkModel from "@/models/chunk";
import ChatModel from "@/models/chat";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await req.json();

    const agent = await AgentModel.findById(agentId);

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (agent.userId.toString() !== session.user._id) {
      return NextResponse.json(
        { error: "Forbidden: You are not the creator of this agent" },
        { status: 403 }
      );
    }

    await ChunkModel.deleteMany({ agentId: agentId });
    await AgentModel.findByIdAndDelete(agentId);
    await ChatModel.findByIdAndDelete(agentId);

    return NextResponse.json(
      {
        message: "Agent deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete agent", details: error.message },
      { status: 500 }
    );
  }
}
