import transporter from "../config/email.js";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
};

export default sendEmail;
