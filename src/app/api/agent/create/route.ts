import connectDB from "@/lib/db";
import AgentModel from "@/models/agent";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing data",
        },
        { status: 400 }
      );
    }

    const newAgent = await AgentModel.create({
      name,
      description,
      userId: session?.user?._id,
    });

    return NextResponse.json(
      {
        newAgent,
        message: "Agent created successfully!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create agent";

    return NextResponse.json(
      { error: errorMessage, details: error },
      { status: 500 }
    );
  }
}
