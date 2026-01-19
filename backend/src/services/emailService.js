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

// Don't create transporter at module level - create fresh each time for better reliability
// const transporter = createTransporter();

/**
 * Send email to admin with retry logic
 * @param {Object} options - Email options
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @returns {Promise<Object>} - Email send result
 */
export const sendMail = async ({ subject, html }) => {
  // Support both EMAIL_USER/EMAIL_PASS and SMTP_USER/SMTP_PASS for consistency
  const EMAIL_USER = process.env.EMAIL_USER || process.env.SMTP_USER;

  const transporter = createTransporter();
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

  // Retry logic: Try 3 times with exponential backoff
  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📧 Attempting to send email (attempt ${attempt}/${maxRetries})...`);
      
      // Create fresh transporter for each attempt (helps with connection issues)
      const freshTransporter = createTransporter();
      
      // Send email with timeout (reduced to 20 seconds per attempt)
      const info = await Promise.race([
        freshTransporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout after 20 seconds')), 20000)
        )
      ]);

      console.log('✅ Email sent successfully:', {
        messageId: info.messageId,
        to: ADMIN_EMAIL,
        subject,
        attempt
      });
      return {
        success: true,
        messageId: info.messageId,
        message: 'Email sent successfully'
      };
    } catch (error) {
      lastError = error;
      console.error(`❌ Email send failed (attempt ${attempt}/${maxRetries}):`, error.message);
      console.error('   Error code:', error.code);
      console.error('   Error command:', error.command);
      
      // If not the last attempt, wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // 1s, 2s, 4s max
        console.log(`   Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
    }
  }

  // All retries failed
  console.error('❌ All email send attempts failed');
  console.error('   SMTP Host:', process.env.SMTP_HOST || 'smtp.gmail.com');
  console.error('   SMTP Port:', process.env.SMTP_PORT || '587');
  console.error('   SMTP User:', process.env.SMTP_USER ? `${process.env.SMTP_USER.substring(0, 3)}***` : 'NOT SET');
  console.error('   SMTP Secure:', process.env.SMTP_PORT === '465' || process.env.SMTP_SECURE === 'true' ? 'true (SSL)' : 'false (TLS)');
  
  // Provide more specific error messages
  let errorMessage = 'Failed to send email after 3 attempts';
  if (lastError && (lastError.code === 'ETIMEDOUT' || lastError.message.includes('timeout'))) {
    errorMessage = 'Email service timeout after 3 attempts. CRITICAL: Verify SMTP_PASS is Gmail App Password (not regular password).\n' +
      'Steps:\n' +
      '1. Go to https://myaccount.google.com/security\n' +
      '2. Enable 2-Step Verification\n' +
      '3. Generate App Password: Security → App Passwords → Generate\n' +
      '4. Copy 16-character password (no spaces)\n' +
      '5. Update SMTP_PASS in Railway with App Password\n' +
      '6. If still failing, Gmail may be blocking Railway IPs - consider using SendGrid/Mailgun';
  } else if (lastError && lastError.code === 'EAUTH') {
    errorMessage = 'Email authentication failed. CRITICAL: SMTP_PASS must be Gmail App Password.\n' +
      'Regular Gmail password will NOT work. Generate App Password from Google Account settings.';
  } else if (lastError && lastError.code === 'ECONNREFUSED') {
    errorMessage = 'Cannot connect to SMTP server. Check SMTP_HOST and SMTP_PORT settings.';
  } else if (lastError && lastError.code === 'ESOCKET') {
    errorMessage = 'Socket error. Gmail may be blocking Railway IP addresses. Consider using alternative email service.';
  } else if (lastError) {
    errorMessage = `Failed to send email: ${lastError.message}`;
  }
  
  throw new Error(errorMessage);
};
