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
VITE_API_URL=https://your-backend-app.railway.app/api
```

Replace `your-backend-app.railway.app` with your actual Railway backend URL.
