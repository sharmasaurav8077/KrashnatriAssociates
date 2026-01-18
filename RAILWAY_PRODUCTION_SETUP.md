# Railway Production Setup

Quick guide for setting up Railway production deployment.

## ✅ Pre-Deployment Checklist

- [x] Backend code uses `process.env.NODE_ENV`
- [x] Server logs show environment: `Environment: production`
- [x] Railway uses `npm install --omit=dev` (automatic)
- [x] No `--production` flag usage (deprecated)

## 🔧 Railway Configuration

### 1. Set Environment Variables

In Railway Dashboard → **Variables**, add:

```env
NODE_ENV=production
```

**This is REQUIRED** - The server will log "Environment: production" when this is set.

### 2. Railway Build Process

Railway automatically:
- Detects `package.json`
- Runs `npm install --omit=dev` (excludes devDependencies)
- Runs `npm start` to start the server

**No manual configuration needed** - Railway handles this automatically.

### 3. Verify Deployment

After deployment, check Railway logs. You should see:

```
🚀 Server is running on port [PORT]
📡 Environment: production
✅ Production mode enabled
🌐 CORS enabled for: [YOUR_FRONTEND_URL]
```

If you see `Environment: development`, it means `NODE_ENV=production` is not set in Railway.

## 📝 Complete Environment Variables

Add all these in Railway:

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://krashnatri-associates.vercel.app,http://localhost:5173
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ADMIN_SECRET_KEY=your-secure-key
```

## 🚀 Deployment Steps

1. Push code to GitHub
2. Railway auto-deploys (or manually trigger)
3. Set `NODE_ENV=production` in Railway Variables
4. Add all other environment variables
5. Check logs to verify "Environment: production"

## ✅ Verification

After deployment, verify:

1. **Check Logs**: Should show "Environment: production"
2. **Health Check**: `curl https://your-app.railway.app/api/health`
3. **CORS**: Frontend can make requests without CORS errors
4. **Email**: Contact form sends emails
5. **Uploads**: File uploads work with Cloudinary

---

**Status**: ✅ Ready for Railway Production Deployment
