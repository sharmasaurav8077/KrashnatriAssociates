import express from 'express';
import contactRoutes from './contact.routes.js';
import uploadRoutes from './uploadRoutes.js';
import uploadSimpleRoutes from './upload.js';
import enquiryRoutes from './enquiryRoutes.js';
import careerRoutes from './careerRoutes.js';
import testMailRoutes from './testMail.js';

const router = express.Router();

// Health check route (with caching for performance)
router.get('/health', (req, res) => {
  // Set cache headers for health check (5 seconds)
  res.set({
    'Cache-Control': 'public, max-age=5',
    'X-Response-Time': `${Date.now() - req.startTime || 0}ms`
  });
  
  res.status(200).json({ 
    success: true,
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mount route modules
router.use('/contact', contactRoutes);
router.use('/upload', uploadRoutes); // Existing complex upload routes
router.use('/upload', uploadSimpleRoutes); // Simple CloudinaryStorage upload route
router.use('/test', testMailRoutes); // Test email route
router.use('/', enquiryRoutes);
router.use('/', careerRoutes);

export default router;
