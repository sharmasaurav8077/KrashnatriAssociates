import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import routes from './routes/index.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Performance: Compression middleware (gzip responses)
app.use(compression({
  level: 6, // Balance between compression and CPU usage
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// CORS Configuration for Development and Production
// Development: Allows localhost origins
// Production: Only allows origins specified in FRONTEND_URL
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:4173'];

// Helper function to check if origin is allowed
const isOriginAllowed = (origin) => {
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) return true;
  
  // Check exact match
  if (allowedOrigins.includes(origin)) return true;
  
  // Check if origin starts with any allowed origin (for subdomains)
  return allowedOrigins.some(allowed => origin.startsWith(allowed));
};

app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      // In production, be strict; in development, allow localhost
      if (process.env.NODE_ENV === 'production') {
        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      } else {
        // In development, allow all origins for easier testing
        callback(null, true);
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Performance: Optimize JSON parsing with limits
app.use(express.json({ 
  limit: '10mb', // Limit request body size
  strict: true // Only parse arrays and objects
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 100 // Limit number of parameters
}));

// Performance: Add request timing middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

// Performance: Add response time header
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    res.setHeader('X-Response-Time', `${Date.now() - (req.startTime || Date.now())}ms`);
    return originalSend.call(this, data);
  };
  next();
});

// API Routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit in production, just log
  if (process.env.NODE_ENV === 'production') {
    // In production, you might want to log to an error tracking service
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // Exit process in production for uncaught exceptions
  process.exit(1);
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${env}`);
  if (env === 'production') {
    console.log('✅ Production mode enabled');
  }
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please free the port or change PORT in .env`);
    console.error(`   To free port ${PORT}, run: netstat -ano | findstr :${PORT}`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});
