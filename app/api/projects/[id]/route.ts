/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";



export async function GET(
   request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

  await connectToDatabase();

  const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    // console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    const body = await request.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (error: any) {
    // console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}

const getPublicId = (url: string) => {
  const part = url.split("/upload/")[1];

  const withoutVersion = part.replace(/^v\d+\//, "");

  return withoutVersion.replace(/\.[^/.]+$/, "");
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

  await connectToDatabase();

  const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

     // Delete every image from Cloudinary
    if (project.images?.length) {
      await Promise.all(
        project.images.map((image: string) =>
          cloudinary.uploader.destroy(
            getPublicId(image)
          )
        )
      );
    }

    // Delete project from MongoDB
    await Project.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    // // console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
