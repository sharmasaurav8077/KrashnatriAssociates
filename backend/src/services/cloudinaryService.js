import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Upload file to Cloudinary
 * @param {string} filePath - Local file path
 * @param {Object} options - Upload options
 * @param {string} options.folder - Cloudinary folder name
 * @param {string} options.resourceType - 'image' or 'raw' (for documents)
 * @param {string} [options.publicId] - Custom public ID
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = async (filePath, options = {}) => {
  const { folder = 'uploads', resourceType = 'auto', publicId } = options;

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  try {
    // Determine resource type from file extension if not specified
    let detectedResourceType = resourceType;
    if (resourceType === 'auto') {
      const ext = path.extname(filePath).toLowerCase();
      const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
      const documentExts = ['.pdf', '.doc', '.docx'];
      
      if (imageExts.includes(ext)) {
        detectedResourceType = 'image';
      } else if (documentExts.includes(ext)) {
        detectedResourceType = 'raw';
      } else {
        detectedResourceType = 'auto';
      }
    }

    const uploadOptions = {
      folder,
      resource_type: detectedResourceType,
      use_filename: true,
      unique_filename: true,
      overwrite: false
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    // Delete local file after successful upload
    fs.unlinkSync(filePath);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      bytes: result.bytes,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    // Delete local file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array<string>} filePaths - Array of local file paths
 * @param {Object} options - Upload options
 * @returns {Promise<Array<Object>>} - Array of upload results
 */
export const uploadMultipleToCloudinary = async (filePaths, options = {}) => {
  const uploadPromises = filePaths.map(filePath => 
    uploadToCloudinary(filePath, options)
  );

  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - 'image' or 'raw'
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return {
      success: result.result === 'ok',
      result: result.result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
  }
};

/**
 * Fetch all images from Cloudinary (all folders or specific folder)
 * @param {string} folder - Cloudinary folder name (optional, if not provided fetches all images)
 * @param {Object} options - Additional options
 * @returns {Promise<Array<Object>>} - Array of image objects with url, publicId, timestamp
 */
export const fetchImagesFromCloudinary = async (folder = null, options = {}) => {
  try {
    const { maxResults = 500, resourceType = 'image' } = options;
    
    // Build API options
    const apiOptions = {
      type: 'upload',
      resource_type: resourceType,
      max_results: maxResults
    };
    
    // If folder is specified, use prefix. Otherwise fetch all images
    if (folder) {
      apiOptions.prefix = folder;
    }
    
    // Use resources API to list all resources
    const result = await cloudinary.api.resources(apiOptions);

    if (!result.resources || result.resources.length === 0) {
      return [];
    }

    // Sort by created_at (newest first) and map to our format
    return result.resources
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return timeB - timeA; // Descending order
      })
      .map(resource => ({
        url: resource.secure_url,
        publicId: resource.public_id,
        timestamp: new Date(resource.created_at).getTime() || Date.now(),
        format: resource.format,
        width: resource.width,
        height: resource.height,
        bytes: resource.bytes
      }));
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    // Return empty array on error instead of throwing
    return [];
  }
};
