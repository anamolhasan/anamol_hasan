/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const project = await Project.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update project" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const project = await Project.findByIdAndDelete(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
