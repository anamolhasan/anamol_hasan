import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { publicId } = await req.json();

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
  // // console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: "Failed to delete image",
      error: error instanceof Error ? error.message : "Unknown error",
    },
    {
      status: 500,
    }
  );
}
}