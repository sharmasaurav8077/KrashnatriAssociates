// Application constants

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

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
