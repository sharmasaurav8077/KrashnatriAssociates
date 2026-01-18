import { sendMail } from './emailService.js';

// TODO: Add database storage here (e.g., MongoDB)

export const contactService = {
  async processContactForm(formData) {
    const { name, email, company, phone, message } = formData;

    // Log the submission (replace with database storage)
    console.log('Contact form submission:', {
      name,
      email,
      company: company || 'N/A',
      phone: phone || 'N/A',
      message,
      timestamp: new Date().toISOString()
    });

    // Send email notification to admin
    try {
      // Escape HTML to prevent XSS
      const escapeHtml = (text) => {
        const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };
        return String(text || '').replace(/[&<>"']/g, m => map[m]);
      };

      const escapedName = escapeHtml(name);
      const escapedEmail = escapeHtml(email);
      const escapedCompany = escapeHtml(company || 'N/A');
      const escapedPhone = escapeHtml(phone || 'N/A');
      const escapedMessage = escapeHtml(message);

      const emailSubject = `New Contact Form Submission from ${escapedName}`;
      const emailText = `
New contact form submission received:

Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Phone: ${phone || 'N/A'}

Message:
${message}

Submitted at: ${new Date().toLocaleString()}
      `.trim();

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B2254;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${escapedName}</p>
            <p><strong>Email:</strong> ${escapedEmail}</p>
            <p><strong>Company:</strong> ${escapedCompany}</p>
            <p><strong>Phone:</strong> ${escapedPhone}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapedMessage}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;

      await sendMail({
        subject: emailSubject,
        html: emailHtml
      });
    } catch (error) {
      // Log error but don't fail the request
      console.error('Failed to send email notification:', error.message);
    }

    // TODO: Save to database
    // const contact = await ContactModel.create(formData);

    return {
      id: Date.now(), // Temporary ID
      submittedAt: new Date().toISOString()
    };
  }
};
