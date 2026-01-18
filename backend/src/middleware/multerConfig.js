import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, '../../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Allowed image MIME types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Allowed document MIME types
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Maximum file size (10MB)
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760');

/**
 * Disk storage configuration
 * Destination: temp/
 * Keeps original filename
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename
    const originalName = file.originalname;
    cb(null, originalName);
  }
});

/**
 * File filter for images (jpg, jpeg, png)
 */
const imageFileFilter = (req, file, cb) => {
  try {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, jpeg, png) are allowed'), false);
    }
  } catch (error) {
    cb(new Error('Error validating image file'), false);
  }
};

/**
 * File filter for resumes (pdf, doc, docx)
 */
const resumeFileFilter = (req, file, cb) => {
  try {
    if (ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only document files (pdf, doc, docx) are allowed'), false);
    }
  } catch (error) {
    cb(new Error('Error validating document file'), false);
  }
};

/**
 * Multer configuration for single image upload
 */
export const uploadImageSingle = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
}).single('image');

/**
 * Multer configuration for single resume upload
 */
export const uploadResumeSingle = multer({
  storage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
}).single('resume');
