// Type definitions for the application

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
