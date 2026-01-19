# Frontend Environment Variables Example

## Development (.env.local)

Create a `.env.local` file in the `frontend` directory for local development:

```env
# Backend API URL (Development)
VITE_API_URL=http://localhost:4000/api
```

## Production (Vercel)

Add the following environment variable in Vercel Dashboard:

```env
VITE_API_URL=https://api.krashnatriassociates.com/api
```

**Important**: 
- Replace with your actual Railway backend custom domain if different
- If using Railway default domain: `https://[your-railway-app].up.railway.app/api`

### Setting Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `VITE_API_URL` with your Railway backend URL + `/api`
4. Select **Production** environment
5. Save and redeploy
