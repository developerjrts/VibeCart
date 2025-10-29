import "dotenv/config";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  api_key: process.env.API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "VibeCart-Products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 600, height: 600, crop: "limit" }],
  },
});

const upload = multer({ storage });

export default upload;
export { cloudinary };
