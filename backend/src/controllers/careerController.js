import { uploadToCloudinary } from '../services/cloudinaryService.js';
import { sendMail } from '../services/emailService.js';
import { deleteFile } from '../utils/fileUtils.js';
import fs from 'fs';

/**
 * Placeholder function for future database integration
 * @param {Object} data - Career application data to save
 * @returns {Promise<Object>} - Save result (placeholder)
 */
const saveCareer = async (data) => {
  // TODO: Implement database save logic
  // Example: await CareerApplicationModel.create(data);
  return { saved: false, message: 'Database integration pending' };
};

/**
 * Submit career application
 * Accepts applicant details and resume file, uploads resume to Cloudinary,
 * sends email to admin, and returns success response
 * @param {Object} req - Express request object (req.body and req.file from multer)
 * @param {Object} res - Express response object
 */
export const submitCareer = async (req, res) => {
  try {
    // Validate request body exists
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body'
      });
    }

    const { name, email, phone, position } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !position) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, phone, position'
      });
    }

    // Trim and validate string fields
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedPhone = String(phone).trim();
    const trimmedPosition = String(position).trim();

    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(trimmedPhone) || trimmedPhone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }

    // Validate resume file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }

    const filePath = req.file.path;
    let resumeUrl = null;

    try {
      // Upload resume to Cloudinary using uploadToCloudinary with resourceType: 'raw'
      const result = await uploadToCloudinary(filePath, {
        folder: 'careers',
        resourceType: 'raw'
      });

      resumeUrl = result.url;

      // Delete local file after Cloudinary upload (if still exists)
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (cloudinaryError) {
      // Clean up local file if Cloudinary upload fails
      if (filePath && fs.existsSync(filePath)) {
        deleteFile(filePath);
      }
      console.error('Cloudinary upload error:', cloudinaryError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload resume. Please try again.'
      });
    }

    // Prepare email content (escape HTML to prevent XSS)
    const escapeHtml = (text) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return String(text).replace(/[&<>"']/g, m => map[m]);
    };

    const emailSubject = `New Career Application: ${escapeHtml(trimmedPosition)}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B2254;">New Career Application Received</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(trimmedPhone)}</p>
          <p><strong>Position:</strong> ${escapeHtml(trimmedPosition)}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3>Resume:</h3>
          <p><a href="${escapeHtml(resumeUrl)}" target="_blank" style="color: #0B2254; text-decoration: none;">Download Resume</a></p>
          <p style="color: #666; font-size: 12px; word-break: break-all;">${escapeHtml(resumeUrl)}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This application was submitted through the website careers form.</p>
      </div>
    `;

    // Send email to admin
    try {
      await sendMail({
        subject: emailSubject,
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails, but log it
    }

    // Placeholder: Save to database (future implementation)
    // await saveCareer({ name, email, phone, position, resumeUrl });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Application submitted'
    });
  } catch (error) {
    console.error('Error in submitCareer:', error);
    
    // Clean up file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      deleteFile(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit application'
    });
  }
};
