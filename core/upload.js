import multer from 'multer';
import pkg from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

const { v2 : cloudinary } = pkg;

dotenv.config();
// const url = process.env.CLOUDINARY_URL;
// console.log('process.env.CLOUDINARY_URL', url);
// cloudinary.config({
//   cloudinary_url: process.env.CLOUDINARY_URL
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:'img'
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  }
})
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const sanitizedFilename = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
//     cb(null, `${Date.now()}-${sanitizedFilename}`);
//   }
// });

export const upload = multer({storage});