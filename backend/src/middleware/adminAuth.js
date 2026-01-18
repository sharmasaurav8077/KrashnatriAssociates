import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware to verify admin key from request headers
 * Checks for x-admin-key header and validates against ADMIN_SECRET_KEY
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const verifyAdminKey = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!secretKey) {
    console.error('⚠️  ADMIN_SECRET_KEY is not configured in environment variables');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error'
    });
  }

  if (!adminKey || adminKey !== secretKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  // Key is valid, proceed to next middleware
  next();
};
