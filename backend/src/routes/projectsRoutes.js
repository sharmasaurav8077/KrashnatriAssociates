import express from 'express';
import { uploadImageSingle } from '../middleware/multerConfig.js';
import { getProjects, uploadProjectImage, deleteProject } from '../controllers/projectsController.js';
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
 * Get projects
 * GET /api/projects
 * Returns all projects from projects.json
 */
router.get('/', getProjects);

/**
 * Upload project image
 * POST /api/upload/projects
 * Protected with admin key verification
 */
router.post('/', verifyAdminKey, uploadImageSingle, handleMulterError, uploadProjectImage);

/**
 * Delete project
 * DELETE /api/projects/:id
 * Protected with admin key verification
 */
router.delete('/:id', verifyAdminKey, deleteProject);

export default router;
