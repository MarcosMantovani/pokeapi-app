import {
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fade,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginCredentials } from "../../types/auth";

const LoginForm: React.FC = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const { login, isLoading } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(credentials);
    // erro já tratado pelo useAuth
  };

  const handleChange =
    (field: keyof LoginCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={palette.mode === "dark" ? 8 : 4}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: palette.primary.main,
              },
            }}
          >
            <Card elevation={0} sx={{ backgroundColor: "transparent" }}>
              <CardContent className="p-8">
                {/* Header */}
                <Box className="text-center mb-6 w-3/5 mx-auto">
                  <img
                    src="/images/pokeball-icon.png"
                    alt="Pokeapi"
                    className="w-24 h-24 mx-auto"
                  />

                  <Typography
                    variant="body1"
                    color={palette.text.secondary}
                    sx={{ opacity: 0.8 }}
                  >
                    Faça login para continuar
                  </Typography>
                </Box>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-1px)",
                        },
                        "&.Mui-focused": {
                          transform: "translateY(-1px)",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange("password")}
                    margin="normal"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-1px)",
                        },
                        "&.Mui-focused": {
                          transform: "translateY(-1px)",
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      background: palette.primary.main,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                      "&:disabled": {
                        background: palette.secondary.main,
                        transform: "none",
                      },
                    }}
                  >
                    {isLoading ? (
                      <Box className="flex items-center">
                        <CircularProgress
                          size={20}
                          sx={{
                            mr: 1,
                            color: "white",
                          }}
                        />
                        Entrando...
                      </Box>
                    ) : (
                      <Box className="flex items-center justify-center">
                        <LoginIcon sx={{ mr: 1 }} />
                        Entrar
                      </Box>
                    )}
                  </Button>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Não tem uma conta?{" "}
                      <Link
                        component="button"
                        type="button"
                        onClick={() => navigate("/register")}
                        sx={{
                          color: palette.primary.main,
                          textDecoration: "none",
                          fontWeight: 600,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Criar conta
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default LoginForm;
