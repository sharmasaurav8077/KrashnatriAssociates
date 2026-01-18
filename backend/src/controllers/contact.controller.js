import { contactService } from '../services/contact.service.js';

export const submitContact = async (req, res, next) => {
  try {
    // Validate request body exists
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request body' 
      });
    }

    const { name, email, company, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Trim and validate string fields
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
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

    // Process contact form submission
    const result = await contactService.processContactForm({
      name: trimmedName,
      email: trimmedEmail,
      company: company ? String(company).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
      message: trimmedMessage
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
