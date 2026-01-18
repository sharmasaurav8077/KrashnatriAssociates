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
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    // Connection timeout settings for Railway/production
    connectionTimeout: 10000, // 10 seconds to establish connection
    greetingTimeout: 10000, // 10 seconds for SMTP greeting
    socketTimeout: 10000, // 10 seconds for socket operations
    // Retry configuration
    pool: false, // Disable connection pooling for better reliability
    // TLS options for secure connections
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates if needed
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
    // Verify transporter connection before sending (with timeout)
    try {
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('SMTP verification timeout')), 5000)
        )
      ]);
      console.log('✅ SMTP connection verified');
    } catch (verifyError) {
      console.warn('⚠️  SMTP verification failed, but attempting to send anyway:', verifyError.message);
      // Continue with sending even if verification fails
    }

    // Send email with timeout protection
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout after 15 seconds')), 15000)
      )
    ]);

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
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      errorMessage = 'Email service timeout. Please check SMTP configuration and network connectivity.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check SMTP credentials.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to SMTP server. Please check SMTP_HOST and SMTP_PORT.';
    } else {
      errorMessage = `Failed to send email: ${error.message}`;
    }
    
    throw new Error(errorMessage);
  }
};
