import {
  Brightness4,
  Brightness7,
  Close,
  VolumeOff,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useSettings } from "../contexts/SettingsContext";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { palette } = useTheme();

  const { settings, toggleTheme } = useSettings();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 300,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          Configurações
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: palette.text.secondary,
            "&:hover": {
              bgcolor: palette.action.hover,
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Configuração de Notificações */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <VolumeOff
                sx={{
                  mr: 1.5,
                  color: palette.text.secondary,
                  fontSize: 20,
                }}
              />
              <Typography variant="subtitle1" fontWeight="medium">
                Notificações
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Configuração de Tema */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {settings.themeMode === "light" ? (
                <Brightness7
                  sx={{
                    mr: 1.5,
                    color: palette.warning.main,
                    fontSize: 20,
                  }}
                />
              ) : (
                <Brightness4
                  sx={{
                    mr: 1.5,
                    color: palette.info.main,
                    fontSize: 20,
                  }}
                />
              )}
              <Typography variant="subtitle1" fontWeight="medium">
                Tema
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color={palette.text.secondary}
              sx={{ mb: 2, ml: 4 }}
            >
              Escolha entre tema claro ou escuro para a interface
            </Typography>
            <Box sx={{ ml: 4 }}>
              <IconButton
                onClick={handleThemeToggle}
                sx={{
                  border: `1px solid ${palette.divider}`,
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  transition: "all 0.3s ease",
                  bgcolor:
                    settings.themeMode === "light"
                      ? palette.warning.light
                      : palette.info.light,
                  "&:hover": {
                    bgcolor:
                      settings.themeMode === "light"
                        ? palette.warning.main
                        : palette.info.main,
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      transform:
                        settings.themeMode === "light"
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                      transition: "transform 0.5s ease",
                    }}
                  >
                    {settings.themeMode === "light" ? (
                      <Brightness7 sx={{ fontSize: 24 }} />
                    ) : (
                      <Brightness4 sx={{ fontSize: 24 }} />
                    )}
                  </Box>
                  <Typography variant="body1" fontWeight="medium">
                    {settings.themeMode === "light"
                      ? "Modo Claro"
                      : "Modo Escuro"}
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
