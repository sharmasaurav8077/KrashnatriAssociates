# Krashnatri Associates - Professional Survey Services Website

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

A modern, full-stack MERN web application for Krashnatri Associates - a professional firm providing land survey and topographic survey services in Meerut, India.

[Features](#-features) • [Installation](#-getting-started) • [Deployment](#-deployment) • [API Docs](#-api-documentation) • [Support](#-support)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Performance Optimizations](#-performance-optimizations)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

Krashnatri Associates is a professional full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). The platform showcases survey services, handles client inquiries, manages career applications, and provides a comprehensive gallery of completed projects.

### Key Highlights

- ✅ **Modern React Frontend** with TypeScript and Vite
- ✅ **RESTful API Backend** with Express.js
- ✅ **Cloud Storage** integration with Cloudinary
- ✅ **Email Notifications** via Nodemailer
- ✅ **Responsive Design** for all devices
- ✅ **SEO Optimized** with meta tags and structured data
- ✅ **Performance Optimized** with compression and caching
- ✅ **Production Ready** with comprehensive error handling

---

## ✨ Features

### Frontend Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 📱 **Mobile-First** - Fully responsive across all devices
- 🚀 **Fast Loading** - Optimized bundle size and lazy loading
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized** - Meta tags, structured data, and sitemap
- 🎯 **Custom Cursor** - Interactive cursor effects (desktop only)
- 📧 **Contact Forms** - Multiple form types with validation
- 🖼️ **Image Gallery** - Dynamic gallery with Cloudinary integration
- 📄 **E-Brochure** - PDF download functionality
- 💼 **Careers Page** - Job listings and application system

### Backend Features

- ⚡ **High Performance** - Compression, caching, and connection pooling
- 🔒 **Secure** - CORS protection, input validation, and error handling
- 📧 **Email Service** - Automated email notifications
- ☁️ **Cloud Storage** - Cloudinary integration for file uploads
- 🗄️ **Database Ready** - MongoDB integration with Mongoose
- 📊 **Health Monitoring** - Health check endpoint with metrics
- 🛡️ **Error Handling** - Comprehensive error handling middleware
- 📝 **API Documentation** - Well-documented REST endpoints

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.9.3 | Type safety |
| **Vite** | 7.2.4 | Build tool & dev server |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS |
| **Framer Motion** | 12.25.0 | Animation library |
| **GSAP** | 3.14.2 | Advanced animations |
| **React Router** | 7.12.0 | Client-side routing |
| **React Helmet** | 2.0.5 | SEO meta tags |
| **Swiper** | 12.0.3 | Touch slider |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18.2 | Web framework |
| **MongoDB** | 9.1.3 | Database (Mongoose) |
| **Nodemailer** | 7.0.12 | Email service |
| **Cloudinary** | 1.41.3 | Cloud storage |
| **Multer** | 2.0.2 | File upload handling |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Compression** | 1.8.1 | Response compression |
| **dotenv** | 16.3.1 | Environment variables |

---

## 📁 Project Structure

```
krishnatri-associates-final/
├── frontend/                    # React + TypeScript Frontend
│   ├── src/
│   │   ├── api/                # API client & requests
│   │   ├── assets/              # Static assets (images, animations)
│   │   ├── components/          # Reusable React components
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── StructuredData.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   ├── constants/           # App constants
│   │   ├── pages/               # Page components
│   │   │   ├── About.tsx
│   │   │   ├── Careers.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── EBrochure.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Industries.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── sections/            # Page sections
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/                # Utility functions
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # Entry point
│   │   └── style.css            # Global styles
│   ├── public/                  # Public assets
│   ├── dist/                    # Production build output
│   ├── package.json
│   ├── vite.config.ts           # Vite configuration
│   ├── vercel.json              # Vercel deployment config
│   └── ENV_EXAMPLE.md           # Environment variables guide
│
├── backend/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── cloudinary.js
│   │   │   ├── database.js
│   │   │   └── email.js
│   │   ├── controllers/         # Route controllers
│   │   │   ├── careerController.js
│   │   │   ├── contact.controller.js
│   │   │   ├── enquiryController.js
│   │   │   └── uploadController.js
│   │   ├── data/                # Static data files
│   │   │   ├── gallery.json
│   │   │   └── jobs.json
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── adminAuth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── multerConfig.js
│   │   │   ├── notFound.js
│   │   │   └── upload.js
│   │   ├── models/              # MongoDB models (future)
│   │   ├── routes/              # API routes
│   │   │   ├── careerRoutes.js
│   │   │   ├── contact.routes.js
│   │   │   ├── enquiryRoutes.js
│   │   │   ├── index.routes.js
│   │   │   ├── testMail.js
│   │   │   ├── upload.js
│   │   │   └── uploadRoutes.js
│   │   ├── services/            # Business logic
│   │   │   ├── cloudinaryService.js
│   │   │   ├── contact.service.js
│   │   │   └── emailService.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── fileUtils.js
│   │   │   ├── sendEmail.js
│   │   │   └── validation.js
│   │   └── index.js             # Entry point
│   ├── temp/                    # Temporary file storage
│   ├── package.json
│   └── ENV_EXAMPLE.md           # Environment variables guide
│
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
├── DEPLOYMENT_CHANGES.md        # Deployment changes log
├── QA_AUDIT_REPORT.md           # QA audit report
├── BACKEND_PERFORMANCE_OPTIMIZATIONS.md
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** (optional) - For database features
- **Git** - For version control

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd krishnatri-associates-final
```

2. **Install dependencies**

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Configure environment variables**

#### Backend Configuration

Create `backend/.env` file (see `backend/ENV_EXAMPLE.md`):

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB (optional)
MONGODB_URI=mongodb://localhost:27017/krashnatri-associates

# Email Configuration
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
ADMIN_SECRET_KEY=your-secure-admin-key
```

#### Frontend Configuration

Create `frontend/.env.local` file (see `frontend/ENV_EXAMPLE.md`):

```env
VITE_API_URL=http://localhost:4000/api
```

4. **Run the application**

**Option 1: Run both together (recommended for development)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Option 2: Run separately**

```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
cd frontend
npm run dev
```

5. **Access the application**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/api/health

---

## 🔐 Environment Variables

### Backend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port (default: 4000) | `4000` |
| `NODE_ENV` | No | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `http://localhost:5173` |
| `MONGODB_URI` | No | MongoDB connection string | `mongodb://localhost:27017/...` |
| `ADMIN_EMAIL` | Yes | Admin email for notifications | `admin@example.com` |
| `SMTP_HOST` | Yes | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | SMTP server port | `587` |
| `SMTP_USER` | Yes | SMTP username | `your-email@gmail.com` |
| `SMTP_PASS` | Yes | SMTP password/app password | `your-app-password` |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret | `your-api-secret` |
| `ADMIN_SECRET_KEY` | Yes | Admin authentication key | `your-secure-key` |

### Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | No | Backend API URL (default: `http://localhost:4000/api`) | `http://localhost:4000/api` |

> **Note:** See `backend/ENV_EXAMPLE.md` and `frontend/ENV_EXAMPLE.md` for detailed examples.

---

## 💻 Development

### Available Scripts

#### Frontend Scripts

```bash
cd frontend

npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

#### Backend Scripts

```bash
cd backend

npm run dev      # Start development server with auto-reload (nodemon)
npm start        # Start production server
```

### Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **TypeScript**: Frontend uses TypeScript for type safety
- **ESLint**: Code linting is configured
- **Error Handling**: Comprehensive error boundaries and handlers

---

## 🏗 Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/` directory.

**Build Output:**
- Optimized JavaScript bundles
- Minified CSS
- Compressed assets
- Source maps (disabled for security)

### Backend Build

The backend doesn't require a build step. Simply run:

```bash
cd backend
NODE_ENV=production npm start
```

---

## 🚀 Deployment

### Backend → Railway

1. **Connect Repository**
   - Go to [Railway Dashboard](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `backend`

2. **Configure Environment Variables**
   - Add all variables from `backend/ENV_EXAMPLE.md`
   - Set `NODE_ENV=production`
   - Set `FRONTEND_URL` to your Vercel URL

3. **Deploy**
   - Railway auto-detects `package.json` and runs `npm start`
   - Get your backend URL (e.g., `https://your-app.railway.app`)

### Frontend → Vercel

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

2. **Configure Build Settings**
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   - Add `VITE_API_URL` with your Railway backend URL + `/api`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

> **Detailed Guide:** See `DEPLOYMENT_GUIDE.md` for complete deployment instructions.

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:4000/api
Production: https://your-backend.railway.app/api
```

### Endpoints

#### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-01-XXT00:00:00.000Z"
}
```

#### Contact Form

```http
POST /api/contact
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "phone": "+1234567890",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "data": {
    "id": 1234567890,
    "submittedAt": "2025-01-XXT00:00:00.000Z"
  }
}
```

#### Enquiry Form

```http
POST /api/enquiry
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "service": "Topographic Survey",
  "message": "I need a survey for my property."
}
```

#### Career Application

```http
POST /api/career
Content-Type: multipart/form-data
```

**Form Data:**
- `name`: Applicant name
- `email`: Applicant email
- `phone`: Applicant phone
- `position`: Job position
- `resume`: Resume file (PDF/DOC/DOCX)

#### Gallery Images

```http
GET /api/upload/gallery
```

**Response:**
```json
{
  "success": true,
  "message": "Gallery images retrieved successfully",
  "data": {
    "images": [
      {
        "url": "https://res.cloudinary.com/...",
        "timestamp": 1234567890
      }
    ]
  }
}
```

> **Full API Documentation:** See `backend/README.md` for complete API reference.

---

## ⚡ Performance Optimizations

### Backend Optimizations

- ✅ **Response Compression** - Gzip compression (60-80% size reduction)
- ✅ **MongoDB Connection Pooling** - Optimized connection management
- ✅ **File Caching** - In-memory cache for gallery.json (60s TTL)
- ✅ **CORS Preflight Caching** - 24-hour cache for OPTIONS requests
- ✅ **Request Body Limits** - Prevents memory exhaustion
- ✅ **Response Time Tracking** - X-Response-Time header

### Frontend Optimizations

- ✅ **Code Splitting** - Manual chunks for vendor and animations
- ✅ **Asset Optimization** - Optimized images and fonts
- ✅ **Lazy Loading** - Images load on demand
- ✅ **Console Removal** - Console.log removed in production
- ✅ **Bundle Optimization** - Minified and compressed bundles

> **Details:** See `BACKEND_PERFORMANCE_OPTIMIZATIONS.md` for complete optimization details.

---

## 🧪 Testing

### Manual Testing Checklist

#### Frontend
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Navigation works
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Images load correctly
- [ ] No console errors

#### Backend
- [ ] Health check endpoint works
- [ ] Contact form submission works
- [ ] Career form submission works
- [ ] Enquiry form submission works
- [ ] Gallery images load
- [ ] Email notifications sent

### Automated Testing

```bash
# Frontend (if tests are added)
cd frontend
npm test

# Backend (if tests are added)
cd backend
npm test
```

---

## 🔧 Troubleshooting

### Common Issues

#### Backend won't start

- **Check port availability**: Ensure port 4000 is not in use
- **Check environment variables**: Verify `.env` file exists and is configured
- **Check dependencies**: Run `npm install` in backend directory

#### Frontend can't connect to backend

- **Check CORS**: Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- **Check API URL**: Verify `VITE_API_URL` in frontend `.env.local`
- **Check backend is running**: Ensure backend server is started

#### Email not sending

- **Check SMTP credentials**: Verify SMTP_USER and SMTP_PASS are correct
- **Check Gmail App Password**: Use app password, not regular password
- **Check firewall**: Ensure port 587 is not blocked

#### File uploads failing

- **Check Cloudinary credentials**: Verify all Cloudinary env variables
- **Check file size**: Ensure file is under 10MB limit
- **Check file format**: Verify file type is allowed

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Code Style

- Follow existing code style
- Use TypeScript for frontend
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Support

### Contact Information

- **Email**: krashnatriassociates@gmail.com
- **Phone**: +91 8410261096
- **Website**: https://www.krashnatriassociates.com

### Documentation

- **Deployment Guide**: `DEPLOYMENT_GUIDE.md`
- **QA Report**: `QA_AUDIT_REPORT.md`
- **Performance Optimizations**: `BACKEND_PERFORMANCE_OPTIMIZATIONS.md`
- **Backend README**: `backend/README.md`

### Issues

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the documentation files
3. Check existing GitHub issues
4. Create a new issue with detailed information

---

## 🎉 Acknowledgments

- **Developed by**: Tushar Sarawat, Vanshika Sharma, Saurav Sharma
- **Design**: Modern, responsive UI/UX
- **Technologies**: Built with modern web technologies

---

<div align="center">

**Made with ❤️ for Krashnatri Associates**

[⬆ Back to Top](#krashnatri-associates---professional-survey-services-website)

</div>
