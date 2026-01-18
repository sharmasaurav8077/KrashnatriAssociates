import express from 'express';
import { uploadResumeSingle } from '../middleware/multerConfig.js';
import { submitCareer } from '../controllers/careerController.js';

const router = express.Router();

/**
 * Multer error handler middleware
 */
const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB'
      });
    }
    if (err.message) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error'
    });
  }
  next();
};

/**
 * POST /career - Submit career application
 * Uses uploadResumeSingle middleware and submitCareer controller
 */
router.post('/career', uploadResumeSingle, handleMulterError, submitCareer);

export default router;
