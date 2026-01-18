import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Single admin receiver for all website emails (enquiry/contact/career)
// Reads from .env file: ADMIN_EMAIL=krashnatriassociates@gmail.com
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "krashnatriassociates@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
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

export default transporter;
