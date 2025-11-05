import { CalendarToday, Email, Key, Verified } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { User } from "../types/auth";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { InfoSidePanel } from "./InfoSidePanel";
import { UserAvatar } from "./UserAvatar";

interface ProfilePanelProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export function ProfilePanel({ open, onClose, user }: ProfilePanelProps) {
  const { palette } = useTheme();

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  if (!user) return null;

  const handleChangePasswordOpen = () => {
    setChangePasswordOpen(true);
    onClose(); // Fecha o painel quando abre o modal de trocar senha
  };

  const handleChangePasswordClose = () => {
    setChangePasswordOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserRoleLabel = () => {
    if (user.is_superuser) return "Super Admin";
    if (user.is_staff) return "Administrador";
    return "Usuário";
  };

  const getUserRoleColor = () => {
    if (user.is_superuser) return "error";
    if (user.is_staff) return "warning";
    return "primary";
  };

  const getFullName = () => {
    return (
      `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Usuário"
    );
  };

  return (
    <>
      <InfoSidePanel open={open} onClose={onClose} title="Perfil do Usuário">
        {/* Avatar e informações centralizadas */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
            px: 3,
          }}
        >
          <UserAvatar
            name={getFullName()}
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              fontSize: "2.5rem",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
            }}
          >
            {getFullName()}
          </Typography>
          <Typography
            variant="body2"
            color={palette.text.secondary}
            sx={{ mb: 2 }}
          >
            {user.email}
          </Typography>

          {/* Chips de status */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Chip
              label={getUserRoleLabel()}
              size="small"
              color={getUserRoleColor()}
              variant="outlined"
            />
            {user.is_active && (
              <Chip
                label="Ativo"
                size="small"
                color="success"
                variant="outlined"
                icon={<Verified />}
              />
            )}
          </Box>
        </Box>

        {/* Lista de informações */}
        <Box sx={{ px: 3, pb: 3 }}>
          <List>
            {/* Email */}
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>

            {/* Change Password Section */}
            <Divider sx={{ my: 2 }} />
            <ListItem>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
              <ListItemText
                primary="Segurança"
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<Key />}
                      onClick={handleChangePasswordOpen}
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Alterar Senha
                    </Button>
                  </Box>
                }
                secondaryTypographyProps={{ component: "div" }}
              />
            </ListItem>

            <Divider sx={{ my: 2 }} />

            {/* Dates Section */}
            <ListItem>
              <ListItemIcon>
                <CalendarToday fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Informações da Conta"
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color={palette.text.secondary}
                    >
                      Conta criada em: {formatDate(user.date_joined)}
                    </Typography>
                    {user.last_login && (
                      <Typography
                        variant="caption"
                        color={palette.text.secondary}
                      >
                        Último acesso: {formatDate(user.last_login)}
                      </Typography>
                    )}
                  </Box>
                }
                secondaryTypographyProps={{ component: "div" }}
              />
            </ListItem>
          </List>
        </Box>
      </InfoSidePanel>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={handleChangePasswordClose}
      />
    </>
  );
}
