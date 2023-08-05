import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Mutler Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'portfolio',
  allowedFormats: ['jpg', 'jpeg', 'png'],
});

export const upload = multer({ storage });
