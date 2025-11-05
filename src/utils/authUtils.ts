import { AuthTokens, User } from "../types/auth";

const TOKEN_KEY = "auth_tokens";

export const getStoredTokens = (): AuthTokens | null => {
  try {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error("Error parsing stored tokens:", error);
    return null;
  }
};

export const setStoredTokens = (tokens: AuthTokens): void => {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};

export const clearStoredTokens = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

export const getTokenExpirationTime = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp;
  } catch (error) {
    console.error("Error getting token expiration time:", error);
    return null;
  }
};

export const shouldRefreshToken = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = payload.exp - currentTime;
    // Refresh if token expires in less than 5 minutes
    return timeUntilExpiry < 300;
  } catch (error) {
    console.error("Error checking if token should be refreshed:", error);
    return true;
  }
};

export const getUserFullName = (user: User): string => {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  return user.first_name || `Usuário ${user.id}`;
};
