import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";

export interface SettingsState {
  themeMode: ThemeMode;
}

interface SettingsContextType {
  settings: SettingsState;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

interface SettingsProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "pokeapi-settings";

const defaultSettings: SettingsState = {
  themeMode: "light",
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn("Erro ao carregar configurações do localStorage:", error);
    }
    return defaultSettings;
  });

  // Salvar no localStorage sempre que as configurações mudarem
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn("Erro ao salvar configurações no localStorage:", error);
    }
  }, [settings]);

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      themeMode: prev.themeMode === "light" ? "dark" : "light",
    }));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setSettings((prev) => ({
      ...prev,
      themeMode: mode,
    }));
  };

  const value: SettingsContextType = {
    settings,
    toggleTheme,
    setThemeMode,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
