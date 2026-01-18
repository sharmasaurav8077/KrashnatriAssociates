# Railway Deployment Checklist

Use this checklist to ensure your backend is ready for Railway deployment.

## Pre-Deployment Checks

### ✅ Code Configuration

- [x] **Start Script**: `package.json` has `"start": "node src/index.js"`
- [x] **PORT Handling**: Uses `process.env.PORT || 4000` in `src/index.js`
- [x] **Dependencies**: All dependencies listed in `package.json` (including `compression`)
- [x] **CORS Configuration**: Properly configured for production (no wildcard `*`)
- [x] **Error Handling**: Comprehensive error handlers in place
- [x] **Server Binding**: Listens on `0.0.0.0` (required for Railway)

### ✅ Environment Variables

All required environment variables are documented in `ENV_EXAMPLE.md`:

- [x] `PORT` (optional - Railway sets automatically)
- [x] `NODE_ENV` (set to `production`)
- [x] `FRONTEND_URL` (your Vercel frontend URL)
- [x] `MONGODB_URI` (MongoDB connection string)
- [x] `ADMIN_EMAIL` (admin email for notifications)
- [x] `SMTP_HOST` (SMTP server hostname)
- [x] `SMTP_PORT` (SMTP server port)
- [x] `SMTP_USER` (SMTP username)
- [x] `SMTP_PASS` (SMTP password/app password)
- [x] `CLOUDINARY_CLOUD_NAME` (Cloudinary cloud name)
- [x] `CLOUDINARY_API_KEY` (Cloudinary API key)
- [x] `CLOUDINARY_API_SECRET` (Cloudinary API secret)
- [x] `ADMIN_SECRET_KEY` (admin authentication key)

## Railway Configuration

### ✅ Project Settings

- [ ] **Root Directory**: Set to `backend`
- [ ] **Build Command**: (Not required - no build step)
- [ ] **Start Command**: `npm start` (auto-detected)
- [ ] **Node Version**: 18+ (auto-detected)

### ✅ Environment Variables in Railway

Add all variables from the checklist above in Railway Dashboard:
1. Go to your Railway project
2. Click on your service
3. Navigate to **"Variables"** tab
4. Add each variable

**Important**: 
- Set `NODE_ENV=production`
- Set `FRONTEND_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`)
- Use MongoDB Atlas connection string for `MONGODB_URI`

## Post-Deployment Verification

### ✅ Health Check

- [ ] Visit `https://your-app.railway.app/api/health`
- [ ] Should return `{"success": true, "status": "OK"}`

### ✅ CORS Verification

- [ ] Frontend can make API requests without CORS errors
- [ ] Check browser console for CORS errors
- [ ] Verify `FRONTEND_URL` matches your Vercel URL exactly

### ✅ API Endpoints

- [ ] `/api/health` - Health check works
- [ ] `/api/contact` - Contact form submission works
- [ ] `/api/enquiry` - Enquiry form submission works
- [ ] `/api/career` - Career application works
- [ ] `/api/upload/gallery` - Gallery images load

### ✅ Database Connection

- [ ] MongoDB connection successful (check Railway logs)
- [ ] No connection errors in logs

### ✅ Email Service

- [ ] Test email sending (contact form submission)
- [ ] Check admin email for notifications
- [ ] Verify SMTP credentials are correct

### ✅ File Uploads

- [ ] Cloudinary integration works
- [ ] Gallery image uploads succeed
- [ ] Verify Cloudinary credentials

## Common Issues & Solutions

### Issue: Build Fails
**Solution**: 
- Check Railway logs
- Verify `package.json` has all dependencies
- Ensure root directory is set to `backend`

### Issue: Server Won't Start
**Solution**:
- Check Railway logs for errors
- Verify all environment variables are set
- Ensure `PORT` is not hardcoded (use `process.env.PORT`)

### Issue: CORS Errors
**Solution**:
- Verify `FRONTEND_URL` in Railway matches Vercel URL exactly
- Include `https://` protocol
- No trailing slash

### Issue: Database Connection Fails
**Solution**:
- Verify `MONGODB_URI` is correct
- For MongoDB Atlas, whitelist Railway IPs (or use `0.0.0.0/0`)
- Check database user permissions

## Deployment Commands

### Local Testing (Before Railway)

```bash
cd backend
npm install
NODE_ENV=production npm start
```

### Railway Deployment

1. Push code to GitHub
2. Railway auto-deploys on push
3. Or manually trigger deployment in Railway Dashboard

## Next Steps After Deployment

1. ✅ Get Railway backend URL
2. ✅ Update frontend `.env` with Railway URL
3. ✅ Deploy frontend to Vercel
4. ✅ Update Railway `FRONTEND_URL` with Vercel URL
5. ✅ Test all features end-to-end

---

**Ready for Deployment?** ✅

If all checks are complete, your backend is ready for Railway deployment!
