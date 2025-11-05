import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useAuthenticatedRequest } from "../hooks/useAuthenticatedRequest";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const { palette } = useTheme();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { execute } = useAuthenticatedRequest();
  const { showNotification } = useNotification();

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const validateForm = () => {
    if (!newPassword) {
      showNotification("warning", "Digite a nova senha");
      return false;
    }

    if (newPassword.length < 8) {
      showNotification("warning", "A senha deve ter pelo menos 8 caracteres");
      return false;
    }

    if (!confirmPassword) {
      showNotification("warning", "Confirme a nova senha");
      return false;
    }

    if (newPassword !== confirmPassword) {
      showNotification("warning", "As senhas não coincidem");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await execute("/api/users/users/change-password/", {
        method: "POST",
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      showNotification("success", "Senha alterada com sucesso!");
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{}}
    >
      <DialogTitle>
        <Typography variant="h6">Alterar Senha</Typography>
        <Typography variant="body2" color={palette.text.secondary}>
          Digite sua nova senha e confirme abaixo
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          <TextField
            label="Nova Senha"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            required
            autoFocus
            helperText="Mínimo de 8 caracteres"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    size="small"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirmar Nova Senha"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            required
            error={
              confirmPassword.length > 0 && newPassword !== confirmPassword
            }
            helperText={
              confirmPassword.length > 0 && newPassword !== confirmPassword
                ? "As senhas não coincidem"
                : "Digite a senha novamente"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !newPassword || !confirmPassword}
        >
          {loading ? "Alterando..." : "Alterar Senha"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
