import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Validate Cloudinary configuration
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Cloudinary credentials are required in production. Uploads will fail.');
    console.error('   Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  } else {
    console.warn('⚠️  Cloudinary credentials not fully configured. Uploads will fail.');
    console.warn('   Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  }
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

export default cloudinary;
