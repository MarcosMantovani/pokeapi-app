import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Register/RegisterForm";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { palette } = useTheme();

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Show loading state while checking authentication
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
          Verificando autenticação...
        </Typography>
      </Box>
    );
  }

  // If authenticated, show loading while redirecting instead of null
  if (isAuthenticated) {
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
          Redirecionando...
        </Typography>
      </Box>
    );
  }

  return <RegisterForm />;
};

export default Register;
