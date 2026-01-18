# Backend Environment Variables Example

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL (comma-separated for multiple origins)
# For Railway deployment, add your Vercel frontend URL here
FRONTEND_URL=http://localhost:5173,http://localhost:4173

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/krashnatri-associates

# Email Configuration (SMTP)
ADMIN_EMAIL=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Authentication
# Note: Code uses ADMIN_SECRET_KEY (see adminAuth.js)
ADMIN_SECRET_KEY=your-secure-admin-key-here
```
