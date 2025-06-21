import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function uploadCloudinary(file: File) {
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (file.size > maxSize) {
    throw new Error("El tamaño del archivo no puede superar 10MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return await new Promise<{ secure_url?: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          format: "webp",
          transformation: [
            {
              quality: "auto:low",
              raw_transformation: "f_auto,q_auto:low",
            },
          ],
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result as { secure_url?: string });
        }
      )
      .end(buffer);
  });
}
