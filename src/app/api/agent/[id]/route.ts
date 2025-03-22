import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import AgentModel from "@/models/agent";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (id) {
      // Fetch a single agent by ID
      const agent = await AgentModel.findOne({
        _id: id,
        userId: session.user?._id,
      });

      if (!agent) {
        return NextResponse.json(
          { success: false, message: "Agent not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Agent fetched successfully!", agent },
        { status: 200 }
      );
    } else {
      // Fetch all agents if no ID is provided
      const agents = await AgentModel.find({ userId: session.user._id });

      return NextResponse.json(
        { success: true, message: "Agents fetched successfully!", agents },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage, detail: error },
      { status: 500 }
    );
  }
}
