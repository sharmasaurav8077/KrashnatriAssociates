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

  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const isSecure = smtpPort === 465 || process.env.SMTP_SECURE === 'true';
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure: isSecure, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    // Increased timeout settings for Railway/production (Gmail can be slow)
    connectionTimeout: 30000, // 30 seconds to establish connection (increased from 10s)
    greetingTimeout: 30000, // 30 seconds for SMTP greeting (increased from 10s)
    socketTimeout: 30000, // 30 seconds for socket operations (increased from 10s)
    // Retry configuration
    pool: false, // Disable connection pooling for better reliability
    // TLS options for Gmail (port 587 requires TLS)
    requireTLS: !isSecure, // Require TLS for port 587
    tls: {
      rejectUnauthorized: true, // Verify SSL certificate (Gmail has valid cert)
      minVersion: 'TLSv1.2' // Use TLS 1.2 or higher
    },
    // Debug logging for production troubleshooting
    debug: process.env.NODE_ENV === 'production' ? false : false, // Set to true for detailed logs
    logger: process.env.NODE_ENV === 'production' ? false : false // Set to true for detailed logs
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
    // Skip verification in production to avoid timeout (Gmail can be slow from Railway)
    // Verification will happen during actual send
    if (process.env.NODE_ENV !== 'production') {
      try {
        await Promise.race([
          transporter.verify(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('SMTP verification timeout')), 10000)
          )
        ]);
        console.log('✅ SMTP connection verified');
      } catch (verifyError) {
        console.warn('⚠️  SMTP verification failed, but attempting to send anyway:', verifyError.message);
      }
    }

    // Send email with increased timeout (Gmail from Railway can take time)
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout after 30 seconds')), 30000)
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
    console.error('   Error code:', error.code);
    console.error('   Error command:', error.command);
    console.error('   SMTP Host:', process.env.SMTP_HOST || 'smtp.gmail.com');
    console.error('   SMTP Port:', process.env.SMTP_PORT || '587');
    console.error('   SMTP User:', process.env.SMTP_USER ? `${process.env.SMTP_USER.substring(0, 3)}***` : 'NOT SET');
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      errorMessage = 'Email service timeout. Possible causes:\n' +
        '1. Gmail App Password not used (use App Password, not regular password)\n' +
        '2. Railway network blocking Gmail SMTP\n' +
        '3. Gmail blocking Railway IP addresses\n' +
        'Solution: Verify SMTP_PASS is Gmail App Password, or try port 465 with SMTP_SECURE=true';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please verify:\n' +
        '1. SMTP_USER is correct Gmail address\n' +
        '2. SMTP_PASS is Gmail App Password (not regular password)\n' +
        '3. 2-Step Verification is enabled in Google Account\n' +
        '4. App Password is generated from Google Account → Security → App Passwords';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to SMTP server. Please check:\n' +
        '1. SMTP_HOST is correct (smtp.gmail.com)\n' +
        '2. SMTP_PORT is correct (587 for TLS, 465 for SSL)\n' +
        '3. Railway network allows outbound SMTP connections';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Socket error connecting to SMTP server. Gmail might be blocking Railway IP.';
    } else {
      errorMessage = `Failed to send email: ${error.message}`;
    }
    
    throw new Error(errorMessage);
  }
};
