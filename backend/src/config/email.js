import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Single admin receiver for all website emails (enquiry/contact/career)
// Reads from .env file: ADMIN_EMAIL=krashnatriassociates@gmail.com
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "krashnatriassociates@gmail.com";

const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
const isSecure = smtpPort === 465 || process.env.SMTP_SECURE === 'true';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: smtpPort,
  secure: isSecure, // true for 465 (SSL), false for 587 (TLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
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
  }
});

export default transporter;
