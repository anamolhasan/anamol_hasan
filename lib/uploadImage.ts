import cloudinary from "./cloudinary";

export async function uploadImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          // // console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });
}