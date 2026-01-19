# Gmail SMTP Timeout Fix - Complete Solution

## Problem Analysis

### Error:
```
Error sending email: Error: Connection timeout
code: 'ETIMEDOUT'
command: 'CONN'
```

### Root Causes:

1. **Timeout Too Short** ❌
   - Previous: 10 seconds
   - Problem: Railway network + Gmail SMTP can take longer
   - Fix: Increased to 30 seconds

2. **Missing TLS Configuration** ❌
   - Port 587 requires `requireTLS: true`
   - Previous code didn't specify this
   - Fix: Added `requireTLS: true` for port 587

3. **TLS Version** ❌
   - Gmail requires TLS 1.2 or higher
   - Fix: Added `minVersion: 'TLSv1.2'`

4. **Most Likely: Wrong Password Type** ⚠️ **CRITICAL**
   - Gmail **REQUIRES App Password**, not regular password
   - Regular password will cause timeout/authentication errors
   - Fix: Must use Gmail App Password in Railway

5. **Gmail Blocking Railway IPs** ⚠️
   - Gmail might block connections from Railway IP addresses
   - Solution: Use App Password (bypasses some restrictions)

## Fixes Applied

### 1. Increased Timeouts
```javascript
connectionTimeout: 30000,  // 30 seconds (was 10s)
greetingTimeout: 30000,    // 30 seconds (was 10s)
socketTimeout: 30000,      // 30 seconds (was 10s)
sendTimeout: 30000         // 30 seconds (was 15s)
```

### 2. Added Proper TLS Configuration
```javascript
requireTLS: !isSecure,     // Require TLS for port 587
tls: {
  rejectUnauthorized: true, // Verify SSL certificate
  minVersion: 'TLSv1.2'     // Use TLS 1.2 or higher
}
```

### 3. Better Error Messages
- Specific error messages for different failure types
- Detailed troubleshooting steps in error messages
- Logs SMTP configuration (without exposing password)

### 4. Skip Verification in Production
- SMTP verification can timeout even when sending works
- Skip verification in production, verify during actual send

## Railway Environment Variables - CRITICAL CHECK

### Current Settings (Verify These):

```env
SMTP_HOST=smtp.gmail.com        ✅ Correct
SMTP_PORT=587                   ✅ Correct
SMTP_USER=your-email@gmail.com  ✅ Should be Gmail address
SMTP_PASS=*******              ⚠️  MUST BE APP PASSWORD!
```

### ⚠️ **MOST IMPORTANT: SMTP_PASS**

**Problem**: If you're using regular Gmail password, it will timeout!

**Solution**: Use Gmail App Password:

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to: **App Passwords**
   - If you don't see it, search "App passwords" in Google Account settings
4. Generate App Password:
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Enter "Railway"
   - Click "Generate"
5. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)
6. **Remove spaces** and paste in Railway `SMTP_PASS` variable

### Alternative: Try Port 465 (SSL)

If port 587 still times out, try port 465:

```env
SMTP_PORT=465
SMTP_SECURE=true
```

**Note**: Port 465 uses SSL, port 587 uses TLS. Both work with Gmail.

## Testing Steps

1. **Verify Railway Variables**:
   - Check `SMTP_PASS` is App Password (16 characters, no spaces)
   - Check `SMTP_USER` is full Gmail address
   - Check `SMTP_PORT` is 587 (or 465)

2. **Redeploy on Railway**:
   - Push code to GitHub
   - Railway will auto-deploy

3. **Test Email Sending**:
   - Submit contact form from Vercel frontend
   - Check Railway logs

4. **Expected Logs (Success)**:
   ```
   ✅ Email sent successfully: { messageId: '...', to: '...', subject: '...' }
   ```

5. **Expected Logs (Failure - Check Error)**:
   ```
   ❌ Error sending email: [specific error]
   Error code: ETIMEDOUT / EAUTH / ECONNREFUSED
   ```

## Troubleshooting

### If Still Timing Out:

#### Option 1: Verify App Password
- Double-check `SMTP_PASS` is App Password (not regular password)
- App Password is 16 characters, no spaces
- Regenerate if unsure

#### Option 2: Try Port 465
```env
SMTP_PORT=465
SMTP_SECURE=true
```
Then redeploy.

#### Option 3: Check Gmail Security
- Ensure 2-Step Verification is enabled
- Check if Google blocked the login attempt
- Go to: https://myaccount.google.com/security → Recent security activity

#### Option 4: Use Alternative Email Service
If Gmail continues to timeout:
- **SendGrid** (recommended for production)
- **Mailgun**
- **AWS SES**
- **Resend**

## Code Changes Summary

**Files Modified**:
1. `backend/src/services/emailService.js`
   - Increased timeouts to 30 seconds
   - Added `requireTLS` for port 587
   - Added proper TLS configuration
   - Better error messages
   - Skip verification in production

2. `backend/src/config/email.js`
   - Increased timeouts to 30 seconds
   - Added `requireTLS` for port 587
   - Added proper TLS configuration

## Next Steps

1. ✅ **Code fixed** - Timeouts increased, TLS configured
2. ⚠️ **Action Required**: Verify `SMTP_PASS` is Gmail App Password in Railway
3. 🔄 **Redeploy** on Railway
4. 🧪 **Test** email sending
5. 📧 **Check** admin email inbox

---

**Status**: ✅ Code Fixes Applied
**Action Required**: Verify Gmail App Password in Railway
