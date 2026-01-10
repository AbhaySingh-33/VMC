/**
 * API Client for VMC Civic App
 * Centralized HTTP client with type-safe methods for authentication endpoints
 */

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}

interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  data: null;
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error: any) {
    // Handle network errors or JSON parse errors
    if (error.message === 'Failed to fetch') {
      return {
        success: false,
        statusCode: 500,
        message: 'Network error. Please check your connection.',
        data: null,
      };
    }
    
    // Return API error response
    return error as ApiError;
  }
}

// ============================================
// Authentication API Methods
// ============================================

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  verified: boolean;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

/**
 * Request OTP for password reset
 */
export async function requestPasswordResetOtp(
  email: string
): Promise<ApiResponse<ForgotPasswordResponse>> {
  return apiRequest<ForgotPasswordResponse>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Verify OTP code
 */
export async function verifyOtp(
  email: string,
  otp: string
): Promise<ApiResponse<VerifyOtpResponse>> {
  return apiRequest<VerifyOtpResponse>('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
}

/**
 * Reset password with verified OTP
 */
export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
): Promise<ApiResponse<ResetPasswordResponse>> {
  return apiRequest<ResetPasswordResponse>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, otp, newPassword }),
  });
}

// Export API client object for organized imports
export const apiClient = {
  auth: {
    requestPasswordResetOtp,
    verifyOtp,
    resetPassword,
  },
};

export default apiClient;
