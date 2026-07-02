/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get("limit");
    let query = Project.find().sort({ createdAt: -1 });
    if (limit) { 
      query = query.limit(Number(limit)); 
    } 
    const projects = await query;

    
    return NextResponse.json({ 
      success: true, 
      data: projects 
    });
  } catch (error: any) {
  console.error("Error fetching projects:", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message,
      error,
    },
    {
      status: 500,
    }
  );
}
}

export async function POST(request: NextRequest) {
  try {
    // console.log("step 1: Received request to create project");
    await connectToDatabase();
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 },
      );
    }

    if (!body.description) {
      return NextResponse.json(
        {
          success: false,
          message: "Description is required",
        },
        { status: 400 },
      );
    }

    if (!body.images || body.images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload at least one image",
        },
        { status: 400 },
      );
    }

    if (!body.technologies || body.technologies.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please add at least one technology",
        },
        { status: 400 },
      );
    }
    // console.log("step 2: Project data received", body);

    const project = new Project(body);
    const savedProject = await project.save();

    // // console.log("step 3: Project created successfully", savedProject);
    return NextResponse.json(
      { success: true, data: savedProject },
      { status: 201 },
    );
  } catch (error: any) {
    // // console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create project" },
      { status: 400 },
    );
  }
}
