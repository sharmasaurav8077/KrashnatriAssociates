import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { ADMIN_EMAIL } from '../config/email.js';

dotenv.config();

/**
 * Create email transporter using Gmail SMTP
 */
const createTransporter = () => {
  // Support both EMAIL_USER/EMAIL_PASS and SMTP_USER/SMTP_PASS
  const EMAIL_USER = process.env.EMAIL_USER || process.env.SMTP_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (!EMAIL_USER || !EMAIL_PASS) {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Email credentials are required in production. Email service will not be available.');
      console.error('   Required: EMAIL_USER (or SMTP_USER) and EMAIL_PASS (or SMTP_PASS)');
    } else {
      console.warn('⚠️  Email credentials not configured. Email service will not be available.');
      console.warn('   Required: EMAIL_USER (or SMTP_USER) and EMAIL_PASS (or SMTP_PASS)');
    }
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
};

const transporter = createTransporter();

/**
 * Send email to admin
 * @param {Object} options - Email options
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @returns {Promise<Object>} - Email send result
 */
export const sendMail = async ({ subject, html }) => {
  // Support both EMAIL_USER/EMAIL_PASS and SMTP_USER/SMTP_PASS for consistency
  const EMAIL_USER = process.env.EMAIL_USER || process.env.SMTP_USER;

  if (!transporter) {
    const errorMsg = process.env.NODE_ENV === 'production'
      ? 'Email service is not configured. Please contact the administrator.'
      : 'Email transporter is not configured. Please check EMAIL_USER (or SMTP_USER) and EMAIL_PASS (or SMTP_PASS) credentials.';
    throw new Error(errorMsg);
  }

  if (!subject || !html) {
    throw new Error('Email subject and html body are required');
  }

  const mailOptions = {
    from: EMAIL_USER || 'noreply@krishnatriassociates.com',
    to: ADMIN_EMAIL,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      to: ADMIN_EMAIL,
      subject
    });
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
