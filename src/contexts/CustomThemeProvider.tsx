import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { useSettings } from "../contexts/SettingsContext";

interface CustomThemeProviderProps {
  children: ReactNode;
}

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const { settings } = useSettings();

  const theme = useMemo(() => {
    const isDark = settings.themeMode === "dark";

    return createTheme({
      palette: {
        mode: isDark ? "dark" : "light",
        primary: {
          main: "#E3350D", // Pokéball red
          dark: "#B51E0B",
          light: "#FF5A36",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#386ABB", // Cerulean blue
          light: "#5C8DD8",
          dark: "#244A86",
          contrastText: "#ffffff",
        },
        highlight: {
          main: "#FFCC00", // Pikachu yellow
          contrastText: "#000000",
        },
        background: {
          default: isDark ? "#0C1821" : "#FAFAFA",
          paper: isDark ? "#1B263B" : "#FFFFFF",
        },
        text: {
          primary: isDark ? "#E0E0E0" : "#1B1B1B",
          secondary: isDark ? "#A5B0C4" : "#4F4F4F",
        },
        divider: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        scrollbar: {
          track: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          thumb: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
          thumbHover: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
        },
      },
      typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h1: {
          fontSize: "2.2rem",
          fontWeight: 700,
          letterSpacing: "-0.5px",
        },
        h2: {
          fontSize: "1.8rem",
          fontWeight: 600,
        },
        h3: {
          fontSize: "1.4rem",
          fontWeight: 500,
        },
        button: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
      shape: {
        borderRadius: 16,
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              backgroundImage: "none",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              padding: "8px 20px",
              fontWeight: 600,
              transition: "transform 0.15s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 20,
              transition: "0.3s",
              "&:hover": {
                boxShadow: isDark
                  ? "0 0 20px rgba(255,255,255,0.05)"
                  : "0 0 20px rgba(0,0,0,0.08)",
              },
            },
          },
        },
      },
    });
  }, [settings.themeMode]);

  const scrollbarStyles = {
    "*::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "*::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      background: theme.palette.scrollbar.thumb,
      borderRadius: "6px",
      transition: "background 0.2s ease",
      "&:hover": {
        background: theme.palette.scrollbar.thumbHover,
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={scrollbarStyles} />
      {children}
    </ThemeProvider>
  );
}
