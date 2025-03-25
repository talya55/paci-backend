import express from 'express';
import {
  createCircular,
  deleteCircular,
  getAllCirculars,
  getCircularById,
  getFile,
  updateCircular,
} from '../controllers/circulars.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// ✅ Create circular (with file upload)
router.post('/', upload.single('pdf'), createCircular);

// ✅ Get all circulars
router.get('/', getAllCirculars);

// ✅ Get a single circular by ID
router.get('/:id', getCircularById);

// ✅ Update circular (with file upload)
router.put('/:id', upload.single('pdf'), updateCircular);

// ✅ Delete circular
router.delete('/:id', deleteCircular);

// ✅ Get file by ID
router.get('/file/:id', getFile);

export default router;
