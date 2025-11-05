import "setimmediate";

import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import Pokemons from "./pages/Pokemons";
import Login from "./pages/Login";
import PokemonDetail from "./pages/PokemonDetail";
import { FunctionsSidebar } from "./components/FunctionsSidebar";

export const COLLAPSED_FUNCTIONS_SIDEBAR_WIDTH = 48;
export const COLLAPSED_FUNCTIONS_SIDEBAR_TOTAL_WIDTH = 48 + 24 + 24;
export const EXPANDED_FUNCTIONS_SIDEBAR_WIDTH = 400;

const PageRoutes = () => {
  const { palette } = useTheme();

  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6" color={palette.text.secondary}>
          Carregando aplicação...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Barra lateral vertical à esquerda (fixa) */}
      {isAuthenticated && (
        <FunctionsSidebar
          collapsedWidth={COLLAPSED_FUNCTIONS_SIDEBAR_WIDTH}
          expandedWidth={EXPANDED_FUNCTIONS_SIDEBAR_WIDTH}
        />
      )}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Pokemons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon/:name/"
          element={
            <ProtectedRoute>
              <PokemonDetail />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </Box>
  );
};

export default PageRoutes;
