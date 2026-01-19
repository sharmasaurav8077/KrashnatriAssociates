import { uploadToCloudinary, deleteFromCloudinary, fetchImagesFromCloudinary } from '../services/cloudinaryService.js';
import { deleteFile } from '../utils/fileUtils.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance: Cache for gallery.json to avoid repeated file reads
let galleryJsonCache = null;
let galleryJsonCacheTime = 0;
const GALLERY_CACHE_TTL = 60000; // Cache for 60 seconds

// Performance: Optimized function to read gallery.json with caching
const readGalleryJson = () => {
  const now = Date.now();
  if (galleryJsonCache && (now - galleryJsonCacheTime) < GALLERY_CACHE_TTL) {
    return galleryJsonCache;
  }
  
  const galleryFilePath = path.join(__dirname, '../data/gallery.json');
  if (!fs.existsSync(galleryFilePath)) {
    galleryJsonCache = [];
    galleryJsonCacheTime = now;
    return [];
  }
  
  try {
    const fileContent = fs.readFileSync(galleryFilePath, 'utf8');
    if (fileContent.trim()) {
      const parsed = JSON.parse(fileContent);
      galleryJsonCache = Array.isArray(parsed) ? parsed : [];
    } else {
      galleryJsonCache = [];
    }
    galleryJsonCacheTime = now;
    return galleryJsonCache;
  } catch (error) {
    console.error('Error reading gallery.json:', error);
    galleryJsonCache = [];
    galleryJsonCacheTime = now;
    return [];
  }
};

// Performance: Invalidate cache when gallery is updated
const invalidateGalleryCache = () => {
  galleryJsonCache = null;
  galleryJsonCacheTime = 0;
};

/**
 * Upload gallery image to Cloudinary
 * Uses uploadToCloudinary with resourceType: 'image'
 * @param {Object} req - Express request object (req.file from multer)
 * @param {Object} res - Express response object
 */
export const uploadGalleryImage = async (req, res) => {
  try {
    // Return 400 if file missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const filePath = req.file.path;

    try {
      // Upload to Cloudinary using uploadToCloudinary with resourceType: 'image'
      const result = await uploadToCloudinary(filePath, {
        folder: 'gallery',
        resourceType: 'image'
      });

      // Delete local file after Cloudinary upload
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      // Append result to gallery.json
      const galleryFilePath = path.join(__dirname, '../data/gallery.json');
      try {
        // Performance: Use cached read if available, otherwise read from file
        let galleryData = readGalleryJson();
        
        // Append new entry
        galleryData.push({
          url: result.url,
          publicId: result.publicId,
          timestamp: Date.now()
        });
        
        // Write back to file
        fs.writeFileSync(galleryFilePath, JSON.stringify(galleryData, null, 2), 'utf8');
        
        // Performance: Invalidate cache after write
        invalidateGalleryCache();
      } catch (jsonError) {
        // Log error but don't fail the request
        console.error('Error updating gallery.json:', jsonError);
      }

      // Return success response with public_id and secure_url
      return res.status(200).json({
        success: true,
        message: 'Gallery image uploaded successfully',
        data: {
          url: result.url,
          publicId: result.publicId
        }
      });
    } catch (cloudinaryError) {
      // Clean up local file if Cloudinary upload fails
      if (filePath) {
        deleteFile(filePath);
      }
      console.error('Cloudinary upload error:', cloudinaryError);
      throw cloudinaryError;
    }
  } catch (error) {
    console.error('Error in uploadGalleryImage:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload gallery image'
    });
  }
};

/**
 * Get gallery images from gallery.json
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getGalleryImages = async (req, res) => {
  try {
    // Fetch images directly from Cloudinary (all folders)
    // This ensures all images uploaded to Cloudinary appear automatically
    let cloudinaryImages = [];
    try {
      // Try to fetch all images from Cloudinary (no folder restriction)
      // This will get images from any folder the user uploaded to
      cloudinaryImages = await fetchImagesFromCloudinary(null, { maxResults: 500 });
      
      // Only log in development
      if (process.env.NODE_ENV !== 'production') {
        if (cloudinaryImages.length > 0) {
          console.log(`✅ Fetched ${cloudinaryImages.length} images from Cloudinary`);
        } else {
          console.log('ℹ️  No images found in Cloudinary, using gallery.json');
        }
      }
    } catch (cloudinaryError) {
      // Only log in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('⚠️  Error fetching from Cloudinary, using gallery.json:', cloudinaryError.message);
      }
      // Fall back to gallery.json if Cloudinary fetch fails
    }

    // Performance: Use cached gallery.json read
    const jsonImages = readGalleryJson();

    // Merge Cloudinary images with JSON images, removing duplicates by URL
    const imageMap = new Map();
    
    // Add Cloudinary images first (they are the source of truth)
    cloudinaryImages.forEach(img => {
      if (img && img.url) {
        imageMap.set(img.url, {
          url: img.url,
          publicId: img.publicId || null,
          timestamp: img.timestamp || Date.now()
        });
      }
    });
    
    // Add JSON images that aren't already in Cloudinary
    jsonImages.forEach(img => {
      if (img && img.url && !imageMap.has(img.url)) {
        imageMap.set(img.url, {
          url: img.url,
          publicId: img.publicId || null,
          timestamp: img.timestamp || Date.now()
        });
      }
    });

    // Convert map to array and sort by timestamp (newest first)
    const allImages = Array.from(imageMap.values()).sort((a, b) => {
      return (b.timestamp || 0) - (a.timestamp || 0);
    });
    
    // Ensure clean JSON response - set headers explicitly
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      message: 'Gallery images retrieved successfully',
      data: {
        images: allImages
      }
    });
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error in getGalleryImages:', error);
    }
    
    // Return clean JSON response with empty array on error
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      message: 'Gallery images retrieved successfully',
      data: {
        images: []
      }
    });
  }
};

/**
 * Delete gallery image
 * Removes image from gallery.json by index or URL
 * @param {Object} req - Express request object (req.params.id - can be index or URL)
 * @param {Object} res - Express response object
 */
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Image ID is required'
      });
    }

    const galleryFilePath = path.join(__dirname, '../data/gallery.json');

    // Read gallery.json
    if (!fs.existsSync(galleryFilePath)) {
      return res.status(404).json({
        success: false,
        message: 'Gallery file not found'
      });
    }

    // Performance: Use cached read
    let galleryData = readGalleryJson();

    // Try to parse as index first
    const index = parseInt(id, 10);
    let deletedImage = null;

    if (!isNaN(index) && index >= 0 && index < galleryData.length) {
      // Delete by index
      deletedImage = galleryData[index];
      galleryData.splice(index, 1);
    } else {
      // Delete by publicId, URL, or partial match
      const initialLength = galleryData.length;
      galleryData = galleryData.filter((image) => {
        // Match by publicId (most reliable)
        if (image.publicId === id) {
          deletedImage = image;
          return false; // Remove this image
        }
        // Match by exact URL
        if (image.url === id) {
          deletedImage = image;
          return false;
        }
        // Match by URL containing id or id containing URL
        if (image.url?.includes(id) || id.includes(image.url)) {
          deletedImage = image;
          return false;
        }
        return true; // Keep this image
      });

      if (galleryData.length === initialLength) {
        return res.status(404).json({
          success: false,
          message: 'Image not found in gallery'
        });
      }
    }

    // Write updated gallery data back to file
    fs.writeFileSync(galleryFilePath, JSON.stringify(galleryData, null, 2), 'utf8');
    
    // Performance: Invalidate cache after write
    invalidateGalleryCache();

    // Delete from Cloudinary using publicId if available
    if (deletedImage) {
      try {
        // Use publicId if available (most reliable)
        if (deletedImage.publicId) {
          await deleteFromCloudinary(deletedImage.publicId, 'image');
        } else if (deletedImage.url) {
          // Fallback: Extract publicId from Cloudinary URL
          // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
          const urlMatch = deletedImage.url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
          if (urlMatch && urlMatch[1]) {
            const cloudinaryPublicId = urlMatch[1];
            await deleteFromCloudinary(cloudinaryPublicId, 'image');
          }
        }
      } catch (cloudinaryError) {
        // Log error but don't fail the request if Cloudinary deletion fails
        console.error('Error deleting from Cloudinary:', cloudinaryError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteGalleryImage:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete gallery image'
    });
  }
};

/**
 * Upload resume/document to Cloudinary
 * Uses uploadToCloudinary with resourceType: 'raw'
 * @param {Object} req - Express request object (req.file from multer)
 * @param {Object} res - Express response object
 */
export const uploadResume = async (req, res) => {
  try {
    // Return 400 if file missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No document file provided'
      });
    }

    const filePath = req.file.path;

    try {
      // Upload to Cloudinary using uploadToCloudinary with resourceType: 'raw'
      const result = await uploadToCloudinary(filePath, {
        folder: 'resumes',
        resourceType: 'raw'
      });

      // Delete local file after Cloudinary upload
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      // Return success response with fileUrl
      return res.status(200).json({
        success: true,
        fileUrl: result.url
      });
    } catch (cloudinaryError) {
      // Clean up local file if Cloudinary upload fails
      if (filePath) {
        deleteFile(filePath);
      }
      console.error('Cloudinary upload error:', cloudinaryError);
      throw cloudinaryError;
    }
  } catch (error) {
    console.error('Error in uploadResume:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload resume'
    });
  }
};
