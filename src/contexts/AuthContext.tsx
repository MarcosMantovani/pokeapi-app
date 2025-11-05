import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthContextType,
  AuthTokens,
  LoginCredentials,
  RegisterCredentials,
  RefreshTokenResponse,
  User,
} from "../types/auth";
import {
  clearStoredTokens,
  getStoredTokens,
  isTokenExpired,
  setStoredTokens,
  shouldRefreshToken,
} from "../utils/authUtils";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Helper to get common headers including ngrok header
const getCommonHeaders = (additionalHeaders: Record<string, string> = {}) => {
  return {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...additionalHeaders,
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const { showNotification } = useNotification();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeAuth = async () => {
    try {
      const storedTokens = await getStoredTokens();
      if (storedTokens) {
        if (isTokenExpired(storedTokens.access)) {
          if (isTokenExpired(storedTokens.refresh)) {
            // Both tokens expired, logout
            console.warn("Both tokens expired, logging out");
            logout();
          } else {
            // Access token expired, refresh it
            try {
              console.warn("Access token expired, refreshing...");
              const newAccessToken = await refreshTokenInternal(
                storedTokens.refresh,
              );
              const newTokens = { ...storedTokens, access: newAccessToken };
              setTokens(newTokens);
              setStoredTokens(newTokens);
              await fetchUserProfile(newAccessToken);
            } catch (error) {
              console.error("Error refreshing token on init:", error);
              logout();
            }
          }
        } else {
          setTokens(storedTokens);
          await fetchUserProfile(storedTokens.access);
        }
      } else {
        console.warn("No stored tokens found");
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
        headers: getCommonHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to fetch user profile:",
          response.status,
          errorText,
        );
        throw new Error(`Failed to fetch user profile: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/token/obtain/`, {
        method: "POST",
        headers: getCommonHeaders(),
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const tokenData = await response.json();

        const authTokens: AuthTokens = {
          access: tokenData.access,
          refresh: tokenData.refresh,
        };

        setTokens(authTokens);
        setStoredTokens(authTokens);

        // Fetch user profile after successful login
        await fetchUserProfile(tokenData.access);

        // Show success notification
        showNotification("success", "Login realizado com sucesso!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.detail ||
          errorData.message ||
          `Login failed with status ${response.status}`;
        console.error("Login failed:", response.status, errorData);

        // Show error notification
        showNotification("error", `Erro ao fazer login: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        showNotification("error", `Erro ao fazer login: ${error.message}`);
      } else {
        showNotification("error", "Erro ao fazer login. Tente novamente.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
        method: "POST",
        headers: getCommonHeaders(),
        body: JSON.stringify({
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const tokenData = await response.json();

        const authTokens: AuthTokens = {
          access: tokenData.access,
          refresh: tokenData.refresh,
        };

        setTokens(authTokens);
        setStoredTokens(authTokens);

        // Fetch user profile after successful registration
        await fetchUserProfile(tokenData.access);

        // Show success notification
        showNotification("success", "Conta criada com sucesso!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.detail ||
          errorData.message ||
          errorData.email?.[0] ||
          errorData.password?.[0] ||
          `Registro falhou com status ${response.status}`;
        console.error("Register failed:", response.status, errorData);

        // Show error notification
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Register error:", error);
      if (error instanceof Error) {
        showNotification("error", `Erro ao criar conta: ${error.message}`);
      } else {
        showNotification("error", "Erro ao criar conta. Tente novamente.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    clearStoredTokens();

    // Show logout notification
    showNotification("info", "Você foi desconectado");
  };

  const refreshTokenInternal = async (
    refreshToken: string,
  ): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
        method: "POST",
        headers: getCommonHeaders(),
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data: RefreshTokenResponse = await response.json();
        return data.access;
      } else {
        const errorText = await response.text();
        console.error("Token refresh failed:", response.status, errorText);
        throw new Error(`Failed to refresh token: ${response.status}`);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  const refreshToken = async (): Promise<string> => {
    if (!tokens?.refresh) {
      throw new Error("No refresh token available");
    }

    if (isTokenExpired(tokens.refresh)) {
      logout();
      throw new Error("Refresh token expired");
    }

    try {
      const newAccessToken = await refreshTokenInternal(tokens.refresh);
      const newTokens = { ...tokens, access: newAccessToken };
      setTokens(newTokens);
      setStoredTokens(newTokens);
      return newAccessToken;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const makeAuthenticatedRequest = async <T,>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> => {
    let accessToken = tokens?.access;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    // Check if token needs refresh
    if (shouldRefreshToken(accessToken)) {
      try {
        accessToken = await refreshToken();
      } catch (error) {
        console.error("Failed to refresh token for request:", error);
        throw new Error("Failed to refresh token");
      }
    }

    const isFormData = options.body instanceof FormData;

    // Make the request with the token
    const requestOptions: RequestInit = {
      ...options,
      headers: isFormData
        ? {
            Authorization: `Bearer ${accessToken}`,
            ...(options.headers as Record<string, string>),
            Accept: "application/json",
          }
        : getCommonHeaders({
            Authorization: `Bearer ${accessToken}`,
            ...((options.headers as Record<string, string>) || {}),
          }),
    };

    if (isFormData && requestOptions.headers) {
      delete (requestOptions.headers as Record<string, string>)["Content-Type"];
      delete (requestOptions.headers as Record<string, string>)["content-type"];
    }

    try {
      const response = await fetch(url, requestOptions);

      if (response.status === 401) {
        console.warn("Received 401, attempting token refresh...");
        // Token might be expired, try to refresh once
        try {
          accessToken = await refreshToken();
          requestOptions.headers = isFormData
            ? {
                Authorization: `Bearer ${accessToken}`,
                ...(options.headers as Record<string, string>),
                Accept: "application/json",
              }
            : getCommonHeaders({
                Authorization: `Bearer ${accessToken}`,
                ...((options.headers as Record<string, string>) || {}),
              });

          if (isFormData && requestOptions.headers) {
            delete (requestOptions.headers as Record<string, string>)[
              "Content-Type"
            ];
            delete (requestOptions.headers as Record<string, string>)[
              "content-type"
            ];
          }
          const retryResponse = await fetch(url, requestOptions);

          if (retryResponse.ok) {
            return await retryResponse.json();
          } else {
            // Preserve the response for error handling
            const error = new Error(
              "Request failed after token refresh",
            ) as any;
            error.response = retryResponse;
            throw error;
          }
        } catch (refreshError) {
          console.error("Token refresh failed, logging out:", refreshError);
          logout();
          throw new Error("Authentication failed");
        }
      }

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const text = await response.text();
          if (text.trim()) {
            return JSON.parse(text);
          }
          return {} as T;
        }

        // For non-JSON responses, return text or null
        const text = await response.text();
        return text as T;
      } else {
        // Create a custom error that preserves the response for error handling
        const error = new Error(
          `Request failed with status: ${response.status}`,
        ) as any;
        error.response = response;
        console.error("Request failed:", response.status);
        throw error;
      }
    } catch (error) {
      console.error("Authenticated request error:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
    makeAuthenticatedRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
