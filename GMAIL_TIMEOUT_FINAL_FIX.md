# Gmail SMTP Timeout - Final Fix & Verification

## Current Status

**Error**: Email send timeout after 30 seconds (even with port 465)

**Root Cause**: Most likely **Gmail App Password not being used** or **Gmail blocking Railway IPs**

## Fixes Applied

### 1. Retry Logic Added ✅
- 3 attempts with exponential backoff (1s, 2s, 4s)
- Fresh transporter created for each attempt
- Better error logging

### 2. Port 465 Configuration ✅
- Code automatically detects port 465 and sets `secure: true`
- No need for `SMTP_SECURE=true` if using port 465

## ⚠️ CRITICAL: Railway Variables Check

### Current Settings (Verify in Railway Dashboard):

```env
SMTP_HOST=smtp.gmail.com        ✅ Should be correct
SMTP_PORT=465                   ✅ Correct (you have this)
SMTP_USER=your-email@gmail.com  ✅ Should be full Gmail address
SMTP_PASS=*******              ⚠️  MUST BE APP PASSWORD!
```

### 🔴 Most Important: SMTP_PASS

**Problem**: If `SMTP_PASS` is regular Gmail password, it WILL timeout!

**Solution**: Must use Gmail App Password

#### How to Generate Gmail App Password:

1. **Go to**: https://myaccount.google.com/security

2. **Enable 2-Step Verification** (if not already):
   - Click "2-Step Verification"
   - Follow setup steps

3. **Generate App Password**:
   - Go back to Security page
   - Scroll to "App passwords" (or search for it)
   - Click "App passwords"
   - Select app: **"Mail"**
   - Select device: **"Other (Custom name)"** → Type "Railway"
   - Click **"Generate"**

4. **Copy the Password**:
   - You'll see: `abcd efgh ijkl mnop` (16 characters with spaces)
   - **Remove all spaces**: `abcdefghijklmnop`
   - Copy this 16-character password

5. **Update in Railway**:
   - Railway Dashboard → Variables
   - Find `SMTP_PASS`
   - Click edit (eye icon to reveal current value)
   - Replace with App Password (16 characters, no spaces)
   - Save

### Verify SMTP_SECURE (Optional)

If using port 465, you don't need `SMTP_SECURE`, but you can add it:

```env
SMTP_PORT=465
SMTP_SECURE=true  (optional - code auto-detects port 465)
```

## Testing After Fix

1. **Update SMTP_PASS** in Railway with App Password
2. **Redeploy** (or restart service)
3. **Test** contact form submission
4. **Check Railway Logs**:

   **Success**:
   ```
   📧 Attempting to send email (attempt 1/3)...
   ✅ Email sent successfully: { messageId: '...', attempt: 1 }
   ```

   **Failure (with retries)**:
   ```
   📧 Attempting to send email (attempt 1/3)...
   ❌ Email send failed (attempt 1/3): [error]
   Retrying in 1000ms...
   📧 Attempting to send email (attempt 2/3)...
   ...
   ```

## If Still Timing Out After App Password

### Option 1: Check Gmail Security Activity
- Go to: https://myaccount.google.com/security
- Check "Recent security activity"
- See if Google blocked any login attempts
- If blocked, click "Yes, it was me" to unblock

### Option 2: Try Port 587 (TLS)
```env
SMTP_PORT=587
SMTP_SECURE=false  (or remove this variable)
```

### Option 3: Use Alternative Email Service

If Gmail continues to block Railway IPs, use:

#### SendGrid (Recommended)
1. Sign up: https://sendgrid.com
2. Get API key
3. Update Railway variables:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   ```

#### Mailgun
1. Sign up: https://mailgun.com
2. Get SMTP credentials
3. Update Railway variables with Mailgun SMTP settings

#### Resend (Modern, Simple)
1. Sign up: https://resend.com
2. Get API key
3. Use Resend API instead of SMTP

## Code Changes Summary

**File**: `backend/src/services/emailService.js`

**Changes**:
1. ✅ Removed module-level transporter (create fresh each time)
2. ✅ Added retry logic (3 attempts with exponential backoff)
3. ✅ Better error messages with specific troubleshooting steps
4. ✅ Detailed logging for each attempt

## Next Steps

1. ✅ **Code fixed** - Retry logic added
2. ⚠️ **ACTION REQUIRED**: Update `SMTP_PASS` in Railway with Gmail App Password
3. 🔄 **Redeploy** on Railway
4. 🧪 **Test** email sending
5. 📧 **Check** admin email inbox

---

**Status**: ✅ Code Fixes Applied (Retry Logic)
**Action Required**: ⚠️ Update SMTP_PASS with Gmail App Password in Railway
