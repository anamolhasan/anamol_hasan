/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      {
        folder: "portfolio-test",
      }
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error: any) {
    // // console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        http_code: error.http_code,
        name: error.name,
      },
      {
        status: 500,
      }
    );
  }
}