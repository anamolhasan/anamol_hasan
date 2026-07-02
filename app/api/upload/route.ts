/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "@/lib/cloudinary";
import { uploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";


// import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await cloudinary.api.ping();

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    // // console.error(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file",
        },
        {
          status: 400,
        }
      );
    }

    const result = (await uploadImage(file)) as {
      secure_url: string;
      public_id: string;
    };

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    // // console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}