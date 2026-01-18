# Production Deployment Guide

Complete guide for deploying Krashnatri Associates MERN application to production.

## 🎯 Production Endpoints

- **Frontend (Vercel)**: `https://krashnatri-associates.vercel.app`
- **Backend (Railway)**: `https://ideal-commitment-production-0985.up.railway.app`
- **API Base**: `https://ideal-commitment-production-0985.up.railway.app/api`

---

## 📋 Frontend Deployment (Vercel)

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Set **Root Directory** to: `frontend`

### Step 2: Configure Build Settings

Vercel will auto-detect Vite, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

```env
VITE_API_URL=https://ideal-commitment-production-0985.up.railway.app/api
```

**Important**: 
- Select **Production** environment
- Replace with your actual Railway backend URL if different
- Include `/api` at the end

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Your site will be live at: `https://krashnatri-associates.vercel.app`

---

## 🚂 Backend Deployment (Railway)

### Step 1: Connect Repository

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository

### Step 2: Configure Root Directory

1. Go to **Project Settings** → **Source**
2. Set **Root Directory** to: `backend`

### Step 3: Set Environment Variables

In Railway Dashboard → **Variables** tab, add all required variables:

```env
# Server Configuration
NODE_ENV=production
PORT=4000

# Frontend URL (comma-separated)
FRONTEND_URL=https://krashnatri-associates.vercel.app,http://localhost:5173

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
- `FRONTEND_URL` can be comma-separated for multiple origins
- Use MongoDB Atlas connection string for production
- Generate a secure random key for `ADMIN_SECRET_KEY`
- Use Gmail App Password (not regular password) for `SMTP_PASS`

### Step 4: Deploy

1. Railway will auto-deploy on push to main branch
2. Or click **"Deploy"** button
3. Get your backend URL from Railway (e.g., `https://ideal-commitment-production-0985.up.railway.app`)

### Step 5: Update Frontend API URL

After getting Railway backend URL, update Vercel environment variable:

```env
VITE_API_URL=https://ideal-commitment-production-0985.up.railway.app/api
```

Then redeploy frontend.

---

## ✅ API Endpoints Verification

All endpoints should be accessible at: `https://ideal-commitment-production-0985.up.railway.app/api`

### Required Endpoints

- ✅ `GET /api/health` - Health check
- ✅ `GET /api/gallery` - Get gallery images
- ✅ `GET /api/projects` - Get projects
- ✅ `POST /api/contact` - Submit contact form
- ✅ `POST /api/upload/gallery` - Upload gallery image (requires admin key)
- ✅ `POST /api/upload/projects` - Upload project image (requires admin key)

---

## 🧪 Production Testing Checklist

### 1. Health Check

```bash
curl https://ideal-commitment-production-0985.up.railway.app/api/health
```

**Expected Response**:
```json
{
  "success": true,
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-01-XXT00:00:00.000Z"
}
```

### 2. Gallery Load (GET)

```bash
curl https://ideal-commitment-production-0985.up.railway.app/api/gallery
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Gallery images retrieved successfully",
  "data": {
    "images": [...]
  }
}
```

### 3. Projects Load (GET)

```bash
curl https://ideal-commitment-production-0985.up.railway.app/api/projects
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": {
    "projects": [...]
  }
}
```

### 4. Contact Form Submission (POST + Email)

```bash
curl -X POST https://ideal-commitment-production-0985.up.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "Test message"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

**Verify**: Check admin email for notification.

### 5. Gallery Upload (POST + Cloudinary)

```bash
curl -X POST https://ideal-commitment-production-0985.up.railway.app/api/upload/gallery \
  -H "X-Admin-Key: your-admin-secret-key" \
  -F "image=@/path/to/image.jpg"
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Gallery image uploaded successfully",
  "data": {
    "image": {
      "url": "https://res.cloudinary.com/...",
      "publicId": "...",
      "timestamp": 1234567890
    }
  }
}
```

**Verify**: 
- Image appears in Cloudinary
- Image appears in gallery.json
- Image visible in frontend gallery

### 6. Projects Upload (POST + Cloudinary)

```bash
curl -X POST https://ideal-commitment-production-0985.up.railway.app/api/upload/projects \
  -H "X-Admin-Key: your-admin-secret-key" \
  -F "image=@/path/to/image.jpg" \
  -F "title=Project Title" \
  -F "category=Category" \
  -F "description=Description"
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Project image uploaded successfully",
  "data": {
    "project": {
      "url": "https://res.cloudinary.com/...",
      "publicId": "...",
      "timestamp": 1234567890,
      "title": "Project Title",
      "category": "Category",
      "description": "Description"
    }
  }
}
```

**Verify**: 
- Image appears in Cloudinary
- Project appears in projects.json
- Project visible in frontend (if implemented)

### 7. CORS Check (Browser)

1. Open browser console on `https://krashnatri-associates.vercel.app`
2. Run:
```javascript
fetch('https://ideal-commitment-production-0985.up.railway.app/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

**Expected**: No CORS errors, successful response.

### 8. Vercel → Railway Communication

1. Visit `https://krashnatri-associates.vercel.app`
2. Open browser DevTools → Network tab
3. Navigate to Gallery page
4. Check API requests to Railway backend

**Verify**: 
- Requests go to Railway URL (not localhost)
- Responses are successful
- No CORS errors

### 9. Error Handling

Test error scenarios:

- Invalid API endpoint → 404 response
- Missing required fields → 400 response
- Invalid admin key → 401 response
- Server error → 500 response with error message

---

## 🔒 Security Checklist

- [x] CORS configured (no wildcard `*`)
- [x] Admin routes require authentication
- [x] Environment variables not exposed
- [x] No hardcoded secrets
- [x] HTTPS enabled (Vercel & Railway)
- [x] Request body size limits (10MB)
- [x] File upload validation

---

## 📊 Monitoring

### Railway Logs

1. Go to Railway Dashboard
2. Click on your service
3. View **Logs** tab
4. Monitor for errors and warnings

### Vercel Analytics

1. Go to Vercel Dashboard
2. Navigate to **Analytics**
3. Monitor performance and errors

---

## 🔧 Troubleshooting

### Frontend Can't Connect to Backend

**Symptoms**: Network errors, CORS errors

**Solutions**:
1. Verify `VITE_API_URL` in Vercel matches Railway URL
2. Check `FRONTEND_URL` in Railway includes Vercel URL
3. Ensure Railway backend is running
4. Check Railway logs for errors

### CORS Errors

**Symptoms**: Browser console shows CORS errors

**Solutions**:
1. Verify `FRONTEND_URL` in Railway includes exact Vercel URL
2. Include `https://` protocol
3. No trailing slash
4. Check Railway logs for CORS warnings

### Email Not Sending

**Symptoms**: Contact form submits but no email received

**Solutions**:
1. Verify SMTP credentials in Railway
2. Use Gmail App Password (not regular password)
3. Check Railway logs for SMTP errors
4. Verify `ADMIN_EMAIL` is correct

### File Uploads Failing

**Symptoms**: Upload returns error

**Solutions**:
1. Verify Cloudinary credentials in Railway
2. Check file size (max 10MB)
3. Verify admin key is correct
4. Check Railway logs for Cloudinary errors

### Database Connection Issues

**Symptoms**: Database-related errors

**Solutions**:
1. Verify `MONGODB_URI` is correct
2. For MongoDB Atlas, whitelist Railway IPs (or use `0.0.0.0/0`)
3. Check database user permissions
4. Verify network connectivity

---

## 📝 Environment Variables Summary

### Vercel (Frontend)

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://ideal-commitment-production-0985.up.railway.app/api` | Yes |

### Railway (Backend)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `production` |
| `FRONTEND_URL` | Yes | `https://krashnatri-associates.vercel.app,http://localhost:5173` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `ADMIN_EMAIL` | Yes | Admin email for notifications |
| `SMTP_HOST` | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | `587` |
| `SMTP_USER` | Yes | Gmail address |
| `SMTP_PASS` | Yes | Gmail App Password |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `ADMIN_SECRET_KEY` | Yes | Secure random key |

---

## 🎉 Deployment Complete!

After completing all steps:

1. ✅ Frontend deployed to Vercel
2. ✅ Backend deployed to Railway
3. ✅ Environment variables configured
4. ✅ All endpoints tested
5. ✅ CORS configured
6. ✅ Email service working
7. ✅ File uploads working

Your application is now live in production! 🚀

---

## 📞 Support

If you encounter issues:

1. Check Railway logs
2. Check Vercel build logs
3. Verify all environment variables
4. Test endpoints using curl or Postman
5. Review error messages in browser console

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
