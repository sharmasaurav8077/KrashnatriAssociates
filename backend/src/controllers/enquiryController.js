import { sendMail } from '../services/emailService.js';

/**
 * Placeholder function for future database integration
 * @param {Object} data - Enquiry data to save
 * @returns {Promise<Object>} - Save result (placeholder)
 */
const saveEnquiry = async (data) => {
  // TODO: Implement database save logic
  // Example: await EnquiryModel.create(data);
  return { saved: false, message: 'Database integration pending' };
};

/**
 * Submit enquiry form
 * Validates fields, sends email to admin, and returns success response
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const submitEnquiry = async (req, res) => {
  try {
    // Validate request body exists
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body'
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, phone, service, message'
      });
    }

    // Trim and validate string fields
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedPhone = String(phone).trim();
    const trimmedService = String(service).trim();
    const trimmedMessage = String(message).trim();

    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      });
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters'
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

    const emailSubject = `New Enquiry: ${escapeHtml(trimmedService)}`;
    const emailText = `
New Enquiry Received

Name: ${trimmedName}
Email: ${trimmedEmail}
Phone: ${trimmedPhone}
Service: ${trimmedService}

Message:
${trimmedMessage}

---
This enquiry was submitted through the website contact form.
    `.trim();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B2254;">New Enquiry Received</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(trimmedPhone)}</p>
          <p><strong>Service:</strong> ${escapeHtml(trimmedService)}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This enquiry was submitted through the website contact form.</p>
      </div>
    `;

    // Send email to admin
    try {
      await sendMail({
        subject: emailSubject,
        html: emailHtml
      });
    } catch (emailError) {
      // Log error but don't fail the request if email fails
      console.error('Error sending email:', emailError);
      // Continue with success response even if email fails
    }

    // Placeholder: Save to database (future implementation)
    // await saveEnquiry({ name, email, phone, service, message });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Enquiry sent'
    });
  } catch (error) {
    console.error('Error in submitEnquiry:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit enquiry'
    });
  }
};
