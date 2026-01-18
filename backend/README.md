# Backend Server

Node.js + Express backend with ES modules support.

## Structure

```
backend/
├── src/
│   ├── config/        # Configuration files (database, email, cloudinary)
│   ├── controllers/   # Route controllers
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── middleware/    # Custom middleware (error handling, etc.)
│   ├── utils/         # Utility functions
│   ├── models/        # MongoDB models (empty for now)
│   ├── data/          # Static data files (gallery.json)
│   └── index.js       # Entry point
├── package.json
└── .env
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Update `.env` with your configuration
   - See `.env` file for all available options

3. **Start the server:**
   ```bash
   # Production
   npm start

   # Development (with auto-reload)
   npm run dev
   ```

## Features

- ✅ Express.js server
- ✅ CORS enabled
- ✅ Environment variables with dotenv
- ✅ JSON body parsing
- ✅ ES modules (ESM)
- ✅ Organized MVC structure
- ✅ Error handling middleware
- ✅ Multer for file uploads
- ✅ Nodemailer for email sending
- ✅ Cloudinary for cloud storage
- ✅ Mongoose for MongoDB integration

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns server status

### Contact Form
- **POST** `/api/contact`
  - Submit contact form
  - Body: `{ name, email, company?, phone?, message }`
  - Returns: `{ success: boolean, message: string }`

## Environment Variables

See `.env` file for configuration options including:
- Server port and environment
- MongoDB connection
- Email service (Nodemailer)
- Cloudinary cloud storage
- File upload settings

## Development

The server runs on `http://localhost:4000` by default.

For development with auto-reload:
```bash
npm run dev
```
