import { uploadToCloudinary, deleteFromCloudinary, fetchImagesFromCloudinary } from '../services/cloudinaryService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance: Cache for projects.json to avoid repeated file reads
let projectsJsonCache = null;
let projectsJsonCacheTime = 0;
const PROJECTS_CACHE_TTL = 60000; // Cache for 60 seconds

// Performance: Optimized function to read projects.json with caching
const readProjectsJson = () => {
  const now = Date.now();
  if (projectsJsonCache && (now - projectsJsonCacheTime) < PROJECTS_CACHE_TTL) {
    return projectsJsonCache;
  }
  
  const projectsFilePath = path.join(__dirname, '../data/projects.json');
  if (!fs.existsSync(projectsFilePath)) {
    projectsJsonCache = [];
    projectsJsonCacheTime = now;
    return [];
  }
  
  try {
    const fileContent = fs.readFileSync(projectsFilePath, 'utf8');
    if (fileContent.trim()) {
      const parsed = JSON.parse(fileContent);
      projectsJsonCache = Array.isArray(parsed) ? parsed : [];
    } else {
      projectsJsonCache = [];
    }
    projectsJsonCacheTime = now;
    return projectsJsonCache;
  } catch (error) {
    console.error('Error reading projects.json:', error);
    projectsJsonCache = [];
    projectsJsonCacheTime = now;
    return [];
  }
};

// Performance: Invalidate cache when projects are updated
const invalidateProjectsCache = () => {
  projectsJsonCache = null;
  projectsJsonCacheTime = 0;
};

/**
 * Get all projects
 * GET /api/projects
 */
export const getProjects = async (req, res) => {
  try {
    // Read from local JSON file
    let projects = readProjectsJson();
    
    // If no projects in file, return empty array
    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Projects retrieved successfully',
        data: {
          projects: []
        }
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects: projects
      }
    });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Upload project image
 * POST /api/upload/projects
 * Requires admin authentication
 */
export const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.path, {
      folder: 'projects',
      resource_type: 'image'
    });

    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to Cloudinary'
      });
    }

    // Read existing projects
    const projectsFilePath = path.join(__dirname, '../data/projects.json');
    let projects = readProjectsJson();

    // Add new project image
    const newProject = {
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      timestamp: Date.now(),
      title: req.body.title || 'Project',
      category: req.body.category || 'General',
      description: req.body.description || ''
    };

    projects.push(newProject);

    // Write to file
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
    invalidateProjectsCache();

    // Clean up local file
    if (req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({
      success: true,
      message: 'Project image uploaded successfully',
      data: {
        project: newProject
      }
    });
  } catch (error) {
    console.error('Error uploading project image:', error);
    
    // Clean up local file on error
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload project image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Delete project
 * DELETE /api/projects/:id
 * Requires admin authentication
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required'
      });
    }

    const projects = readProjectsJson();
    
    // Find project by index or URL
    let projectIndex = -1;
    if (!isNaN(id)) {
      projectIndex = parseInt(id);
    } else {
      projectIndex = projects.findIndex(p => p.url === id || p.publicId === id);
    }

    if (projectIndex === -1 || projectIndex >= projects.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = projects[projectIndex];

    // Delete from Cloudinary if publicId exists
    if (project.publicId) {
      try {
        await deleteFromCloudinary(project.publicId);
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError);
        // Continue with local deletion even if Cloudinary deletion fails
      }
    }

    // Remove from array
    projects.splice(projectIndex, 1);

    // Write to file
    const projectsFilePath = path.join(__dirname, '../data/projects.json');
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
    invalidateProjectsCache();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
