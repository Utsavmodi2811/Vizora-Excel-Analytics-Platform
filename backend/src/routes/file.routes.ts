import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth';
import {
  getUserFiles,
  uploadFile,
  downloadFile,
  deleteFile,
  getFileStats
} from '../controllers/file.controller';
import path from 'path';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// All routes require authentication
router.use(auth);

// Get all files for the authenticated user
router.get('/', getUserFiles);

// Get file statistics for the authenticated user
router.get('/stats', getFileStats);

// Upload a new file
router.post('/upload', upload.single('file'), uploadFile);

// Download a file
router.get('/:id', downloadFile);

// Delete a file
router.delete('/:id', deleteFile);

export default router; 