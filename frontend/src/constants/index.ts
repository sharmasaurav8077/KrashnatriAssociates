// Application constants

// Use environment variable for API URL
// In production: VITE_API_URL should be set to https://ideal-commitment-production-0985.up.railway.app/api
// In development: VITE_API_URL should be set to http://localhost:4000/api
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000/api' : '');

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PROJECTS: '/projects',
  GALLERY: '/gallery',
  CAREERS: '/careers',
  CONTACT: '/contact',
  E_BROCHURE: '/e-brochure',
} as const;
