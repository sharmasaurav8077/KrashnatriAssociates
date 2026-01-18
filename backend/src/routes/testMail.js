import express from "express";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";
import { ADMIN_EMAIL } from "../config/email.js";

dotenv.config();

const router = express.Router();

router.get("/test-mail", async (req, res) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(400).json({ 
        success: false, 
        error: "SMTP_USER and SMTP_PASS must be set in environment variables" 
      });
    }

    await sendEmail(
      ADMIN_EMAIL,
      "SMTP Test - Krishnatri Associates",
      "Your SMTP setup is working! This is a test email from your backend server."
    );
    
    console.log(`✅ Test email sent successfully to: ${ADMIN_EMAIL}`);
    res.json({ 
      success: true, 
      message: "Email sent successfully",
      recipient: ADMIN_EMAIL
    });
  } catch (error) {
    console.error("❌ Error sending test email:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
