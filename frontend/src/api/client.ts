import { API_BASE_URL } from '../constants';
import type { ApiResponse, ContactFormData, CareerFormData, EnquiryFormData } from '../types';

/**
 * Generic API request function
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    // Parse JSON only if response is ok
    const data = await response.json();
    return data;
  } catch (error) {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }
    
    // Re-throw with user-friendly message if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection and try again.');
  }
}

/**
 * Health check
 */
export const checkHealth = (): Promise<ApiResponse> => {
  return apiRequest('/health');
};

/**
 * Submit contact form
 */
export const submitContactForm = (formData: ContactFormData): Promise<ApiResponse> => {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

/**
 * Submit enquiry form
 */
export const submitEnquiry = (formData: EnquiryFormData): Promise<ApiResponse> => {
  return apiRequest('/enquiry', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

/**
 * Submit career application
 */
export const submitCareerApplication = async (formData: CareerFormData): Promise<ApiResponse> => {
  const url = `${API_BASE_URL}/career`;
  
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('position', formData.position);
  formDataToSend.append('resume', formData.resume);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formDataToSend,
    });
    
    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    // Parse JSON only if response is ok
    const data = await response.json();
    return data;
  } catch (error) {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }
    
    // Re-throw with user-friendly message if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection and try again.');
  }
};

/**
 * Get gallery images
 */
export const getGalleryImages = (): Promise<ApiResponse<{ images: Array<{ url: string; timestamp: number }> }>> => {
  return apiRequest('/upload/gallery');
};
