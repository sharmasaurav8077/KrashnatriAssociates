# Email Timeout Fix - Summary

## Problem Analysis

### Error Seen in Railway Logs:
```
Error sending email: Error: Connection timeout
code: 'ETIMEDOUT'
command: 'CONN'
```

### Root Causes:

1. **Network Timeout**: Railway's network might have restrictions connecting to Gmail SMTP
2. **No Timeout Configuration**: Nodemailer didn't have explicit timeout settings
3. **Connection Pooling**: Default connection pooling might cause issues
4. **Gmail Security**: Gmail might block connections from Railway IPs

## Fixes Applied

### 1. Added Timeout Configuration
**Files**: `backend/src/services/emailService.js`, `backend/src/config/email.js`

**Changes**:
- `connectionTimeout: 10000` - 10 seconds to establish connection
- `greetingTimeout: 10000` - 10 seconds for SMTP greeting
- `socketTimeout: 10000` - 10 seconds for socket operations
- `pool: false` - Disable connection pooling for better reliability

### 2. Added Connection Verification
- Verify SMTP connection before sending (with 5-second timeout)
- Continue sending even if verification fails (non-blocking)

### 3. Added Send Timeout Protection
- 15-second timeout for email sending
- Prevents indefinite hanging

### 4. Better Error Messages
- Specific error messages for different failure types:
  - `ETIMEDOUT` → "Email service timeout. Please check SMTP configuration..."
  - `EAUTH` → "Email authentication failed. Please check SMTP credentials."
  - `ECONNREFUSED` → "Cannot connect to SMTP server. Please check SMTP_HOST..."

## Railway Environment Variables Check

Make sure these are set correctly in Railway:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
```

**Important for Gmail**:
- Use **App Password**, not regular password
- Enable "Less secure app access" OR use OAuth2
- App Password: Google Account → Security → 2-Step Verification → App Passwords

## Alternative Solutions

If Gmail SMTP continues to timeout, consider:

### Option 1: Use Different SMTP Port
```env
SMTP_PORT=465
SMTP_SECURE=true
```

### Option 2: Use Different Email Service
- **SendGrid** (recommended for production)
- **Mailgun**
- **AWS SES**
- **Resend**

### Option 3: Use Railway's Email Service
- Railway might have email service add-ons

## Testing

After deployment, test email sending:

1. Submit contact form from Vercel frontend
2. Check Railway logs for:
   - `✅ SMTP connection verified`
   - `✅ Email sent successfully`
3. Check admin email inbox

## Expected Behavior

**Success**:
```
✅ SMTP connection verified
✅ Email sent successfully: { messageId: '...', to: '...', subject: '...' }
```

**Failure (with better error)**:
```
⚠️  SMTP verification failed, but attempting to send anyway: [error]
❌ Error sending email: [specific error message]
```

## Next Steps

1. **Push code to GitHub**
2. **Verify Railway Environment Variables**:
   - Check `SMTP_USER` and `SMTP_PASS` are correct
   - Verify using Gmail App Password
3. **Redeploy on Railway**
4. **Test email sending**
5. **If still timing out**: Consider alternative SMTP service

---

**Status**: ✅ Email Timeout Fix Applied

**Files Changed**:
- `backend/src/services/emailService.js` - Added timeout config and verification
- `backend/src/config/email.js` - Added timeout config
