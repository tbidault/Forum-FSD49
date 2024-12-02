import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  }
});

export const upload = multer({storage});