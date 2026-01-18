import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

/**
 * Check if file is an image
 */
export const isImageFile = (mimetype) => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return imageTypes.includes(mimetype);
};

/**
 * Check if file is a document
 */
export const isDocumentFile = (mimetype) => {
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  return documentTypes.includes(mimetype);
};

/**
 * Get file size in human-readable format
 */
export const getFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Delete file from disk
 */
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

/**
 * Delete multiple files from disk
 */
export const deleteFiles = (filePaths) => {
  return filePaths.map(filePath => deleteFile(filePath));
};

/**
 * Get full file path from relative path
 */
export const getFullPath = (relativePath) => {
  return path.join(__dirname, '../../', relativePath);
};

/**
 * Clean up old files from upload directory
 * @param {string} directory - Directory to clean
 * @param {number} maxAge - Maximum age in milliseconds (default: 24 hours)
 */
export const cleanupOldFiles = (directory, maxAge = 24 * 60 * 60 * 1000) => {
  try {
    if (!fs.existsSync(directory)) {
      return;
    }

    const files = fs.readdirSync(directory);
    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge > maxAge) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old file: ${filePath}`);
      }
    });
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
};
