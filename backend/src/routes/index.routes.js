import express from 'express';
import contactRoutes from './contact.routes.js';
import uploadRoutes from './uploadRoutes.js';
import uploadSimpleRoutes from './upload.js';
import projectsRoutes from './projectsRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import careerRoutes from './careerRoutes.js';
import testMailRoutes from './testMail.js';

const router = express.Router();

// Health check route (with caching for performance)
router.get('/health', (req, res) => {
  // Set cache headers for health check (5 seconds)
  res.setHeader('Content-Type', 'application/json');
  res.set({
    'Cache-Control': 'public, max-age=5',
    'X-Response-Time': `${Date.now() - (req.startTime || Date.now())}ms`
  });
  
  res.status(200).json({ 
    success: true,
    status: 'OK'
  });
});

// Mount route modules
router.use('/contact', contactRoutes);
router.use('/projects', projectsRoutes); // Projects routes (GET /api/projects, DELETE /api/projects/:id)
router.use('/gallery', uploadRoutes); // Gallery routes (GET /api/gallery)
router.use('/upload', uploadRoutes); // Upload routes (POST /api/upload/gallery, DELETE /api/upload/gallery/:id)
router.use('/upload', projectsRoutes); // Projects upload route (POST /api/upload/projects)
router.use('/upload', uploadSimpleRoutes); // Simple CloudinaryStorage upload route
router.use('/test', testMailRoutes); // Test email route
router.use('/', enquiryRoutes);
router.use('/', careerRoutes);

export default router;
