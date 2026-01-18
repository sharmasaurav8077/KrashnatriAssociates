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
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim()).filter(url => url.length > 0)
  : ['http://localhost:5173', 'http://localhost:4173'];

// Log allowed origins on startup for debugging
console.log('🔐 CORS Allowed Origins:', allowedOrigins);

// Helper function to check if origin is allowed
const isOriginAllowed = (origin) => {
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) return true;
  
  // Normalize origin (remove trailing slash)
  const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
  
  // Check exact match (case-insensitive)
  const exactMatch = allowedOrigins.some(allowed => {
    const normalizedAllowed = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
    return normalizedOrigin.toLowerCase() === normalizedAllowed.toLowerCase();
  });
  
  if (exactMatch) return true;
  
  // Check if origin matches any allowed origin (for subdomains and variations)
  const prefixMatch = allowedOrigins.some(allowed => {
    const normalizedAllowed = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
    return normalizedOrigin.toLowerCase().startsWith(normalizedAllowed.toLowerCase());
  });
  
  return prefixMatch;
};

app.use(cors({
  origin: (origin, callback) => {
    // Log origin for debugging
    if (process.env.NODE_ENV === 'production') {
      console.log(`🌐 CORS check - Origin: ${origin || 'no origin'}`);
    }
    
    if (isOriginAllowed(origin)) {
      if (process.env.NODE_ENV === 'production') {
        console.log(`✅ CORS allowed for origin: ${origin || 'no origin'}`);
      }
      callback(null, true);
    } else {
      // In production, be strict; in development, allow localhost
      if (process.env.NODE_ENV === 'production') {
        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        console.warn(`   Allowed origins: ${allowedOrigins.join(', ')}`);
        callback(new Error('Not allowed by CORS'));
      } else {
        // In development, allow all origins for easier testing
        callback(null, true);
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['X-Response-Time'],
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
  console.log(`🔐 Allowed origins: ${allowedOrigins.join(', ')}`);
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
