import React from "react";
import { NotificationContainer } from "../components/NotificationContainer";
import { AuthProvider } from "./AuthContext";
import { CustomThemeProvider } from "./CustomThemeProvider";
import { NotificationProvider } from "./NotificationContext";
import { SettingsProvider } from "./SettingsContext";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <SettingsProvider>
        <CustomThemeProvider>
          <AuthProvider>
            <NotificationContainer />
            {children}
          </AuthProvider>
        </CustomThemeProvider>
      </SettingsProvider>
    </NotificationProvider>
  );
};
