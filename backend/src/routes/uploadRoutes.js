import express from 'express';
import { uploadImageSingle, uploadResumeSingle } from '../middleware/multerConfig.js';
import { uploadGalleryImage, uploadResume, getGalleryImages, deleteGalleryImage } from '../controllers/uploadController.js';
import { verifyAdminKey } from '../middleware/adminAuth.js';

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
 * Get gallery images
 * GET /gallery
 * Returns all images from gallery.json
 */
router.get('/gallery', getGalleryImages);

/**
 * Upload gallery image
 * POST /upload/gallery
 * Protected with admin key verification
 * Uses verifyAdminKey middleware, uploadImageSingle middleware and uploadGalleryImage controller
 */
router.post('/gallery', verifyAdminKey, uploadImageSingle, handleMulterError, uploadGalleryImage);

/**
 * Delete gallery image
 * DELETE /gallery/:id
 * Protected with admin key verification
 * Removes image from gallery.json and Cloudinary
 * id can be array index (number) or image URL
 */
router.delete('/gallery/:id', verifyAdminKey, deleteGalleryImage);

/**
 * Upload resume/document
 * POST /upload/resume
 * Uses uploadResumeSingle middleware and uploadResume controller
 */
router.post('/resume', uploadResumeSingle, handleMulterError, uploadResume);

export default router;
