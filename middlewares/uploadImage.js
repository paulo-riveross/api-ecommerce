import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configuración de almacenamiento
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-products", // carpeta en tu cuenta
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

export const upload = multer({ storage });
 