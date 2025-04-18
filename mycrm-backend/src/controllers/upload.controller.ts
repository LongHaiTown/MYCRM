import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Khởi tạo storage để định nghĩa đường dẫn + tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/images/products';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const uploadProductImages = upload.array('images', 5); // tối đa 5 ảnh

export const handleUpload = (req: Request, res: Response) => {
  const imagePaths = (req.files as Express.Multer.File[]).map(
    (file) => '/images/products/' + file.filename
  );
  res.json({ imagePaths });
};
