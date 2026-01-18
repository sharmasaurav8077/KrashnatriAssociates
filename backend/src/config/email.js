import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Single admin receiver for all website emails (enquiry/contact/career)
// Reads from .env file: ADMIN_EMAIL=krashnatriassociates@gmail.com
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "krashnatriassociates@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;
