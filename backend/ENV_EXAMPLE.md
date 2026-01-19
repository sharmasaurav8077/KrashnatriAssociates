# Backend Environment Variables Example

## Development (.env)

Create a `.env` file in the `backend` directory for local development:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL (comma-separated for multiple origins)
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

## Production (Railway)

**CRITICAL**: For Railway deployment, you MUST set `NODE_ENV=production` in Railway environment variables.

Add all variables in Railway Dashboard → Variables:

```env
# REQUIRED: Set to production
NODE_ENV=production

# Server Configuration
PORT=4000

# Frontend URL (comma-separated for multiple origins)
FRONTEND_URL=https://krashnatriassociates.com,https://www.krashnatriassociates.com,http://localhost:5173

# MongoDB Connection (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krashnatri-associates?retryWrites=true&w=majority

# Email Configuration (SMTP)
ADMIN_EMAIL=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Authentication
ADMIN_SECRET_KEY=your-secure-random-key-here
```

**Important**: 
- ✅ **REQUIRED**: Set `NODE_ENV=production` in Railway (server logs will show "Environment: production")
- Railway uses `npm install --omit=dev` automatically (no devDependencies installed)
- Set `FRONTEND_URL` to your Vercel URL (can include localhost for testing)
- Use MongoDB Atlas connection string for `MONGODB_URI`
- Use production Cloudinary credentials
- Generate a secure random key for `ADMIN_SECRET_KEY`

### Verification

After deployment, check Railway logs. You should see:
```
🚀 Server is running on port [PORT]
📡 Environment: production
✅ Production mode enabled
🌐 CORS enabled for: [YOUR_FRONTEND_URL]
```
