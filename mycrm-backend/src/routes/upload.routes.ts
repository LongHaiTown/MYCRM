import express from 'express';
import { handleUpload, uploadProductImages } from '../controllers/upload.controller';

const router = express.Router();

router.post('/', uploadProductImages, handleUpload);

export default router;
