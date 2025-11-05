// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8000",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/auth/token/obtain/",
      REFRESH: "/api/auth/token/refresh/",
      USER: "/api/auth/user/",
      EXCHANGE: "/api/auth/token/exchange/",
    },
  },
};

// Common headers for all requests
export const getApiHeaders = (
  additionalHeaders: Record<string, string> = {},
) => {
  return {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...additionalHeaders,
  };
};

// Helper to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health/`, {
      method: "GET",
      headers: getApiHeaders(),
      timeout: 5000,
    } as RequestInit);
    return response.ok;
  } catch (error) {
    console.warn("API health check failed:", error);
    return false;
  }
};

// Helper to log API requests in development
export const logApiRequest = (method: string, url: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`🌐 API ${method.toUpperCase()} ${url}`, data ? data : "");
  }
};

// Helper to check if using ngrok
export const isUsingNgrok = (): boolean => {
  const apiUrl = API_CONFIG.BASE_URL;
  return apiUrl.includes("ngrok.") || apiUrl.includes("ngrok-free.app");
};
