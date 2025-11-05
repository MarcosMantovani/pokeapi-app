import { Logout, Pets, Settings } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserAvatar } from "./UserAvatar";
import { ProfilePanel } from "./ProfilePanel";
import { SettingsModal } from "./SettingsModal";
import { useLocation, useNavigate } from "react-router";

interface FunctionsSidebarProps {
  className?: string;
  collapsedWidth?: number;
  expandedWidth?: number;
}

export function FunctionsSidebar({
  className = "",
  collapsedWidth = 48,
  expandedWidth = 0,
}: FunctionsSidebarProps) {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleToggleExpansion = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleSettings = useCallback(() => {
    setSettingsOpen(true);
    setIsExpanded(false);
  }, []);

  const handleSettingsClose = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const handleProfileOpen = useCallback(() => {
    setProfileOpen(true);
    setIsExpanded(false);
  }, []);

  const handleProfileClose = useCallback(() => {
    setProfileOpen(false);
  }, []);

  const functions = useMemo(
    () => [
      {
        icon: <Pets />,
        label: "Pokemons",
        onClick: () => {
          navigate("/");
        },
        has_permission: () => true,
        isActive: () => location.pathname === "/",
      },
    ],
    [location.pathname, navigate],
  );

  const bottomFunctions = [
    {
      icon: <Settings />,
      label: "Configurações",
      onClick: handleSettings,
    },
    {
      icon: (
        <UserAvatar
          name={
            `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
            "Usuário"
          }
          sx={{
            width: 24,
            height: 24,
            fontSize: 14,
          }}
        />
      ),
      label: "Perfil",
      onClick: handleProfileOpen,
    },
    {
      icon: <Logout />,
      label: "Sair",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Box
        className={className}
        sx={{
          position: "fixed",
          left: 24,
          top: 16,
          bottom: 16,
          width: collapsedWidth,
          zIndex: 1300, // Acima de outros elementos
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: isExpanded ? expandedWidth : collapsedWidth,
            zIndex: 1301,
            // bgcolor: palette.sidebar.main,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            py: 2,
            borderRadius: "20px",
          }}
        >
          {/* Funções principais no topo - Expandido */}
          <List
            sx={{
              px: 0.5,
              py: 0,
            }}
          >
            <Box
              sx={{
                px: 1,
                mt: 0.5,
                mb: 2,
                height: 32,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  transition: "all 0.2s ease-in-out",
                  position: "absolute",
                  height: 32,
                  top: 0,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title={
                    isExpanded ? "Toque para recolher" : "Toque para expandir"
                  }
                  placement="right"
                >
                  <img
                    src="/images/pokeball-icon.png"
                    alt="Pokeapi"
                    style={{
                      transition: "all 0.2s ease-in-out",
                      height: 32,
                      cursor: "pointer",
                    }}
                    onClick={handleToggleExpansion}
                  />
                </Tooltip>
              </Box>
            </Box>
            {user &&
              functions
                .filter((func: any) => func.has_permission?.(user) ?? true)
                .map((func: any, index: number) => (
                  <ListItem key={index} disablePadding>
                    <Tooltip
                      title={func.label ?? ""}
                      placement="right"
                      disableHoverListener={isExpanded}
                    >
                      <ListItemButton
                        onClick={func.onClick}
                        selected={func.isActive()}
                        sx={{
                          minHeight: 32,
                          justifyContent: "initial",
                          px: 1,
                          borderRadius: "20px",
                          "&.Mui-selected": {
                            bgcolor: palette.action.selected,
                            "&:hover": {
                              bgcolor: palette.action.selected,
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 3,
                            justifyContent: "center",
                          }}
                        >
                          {func.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={func.label}
                          sx={{
                            opacity: isExpanded ? 1 : 0,
                            transition: "all 0.2s ease-in-out",
                            whiteSpace: "nowrap",
                          }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                ))}
          </List>

          <List
            sx={{
              px: 0.5,
            }}
          >
            {user &&
              bottomFunctions
                .filter((func: any) => func.has_permission?.() ?? true)
                .map((func: any, index: number) => (
                  <ListItem key={index} disablePadding>
                    <Tooltip
                      title={func.label}
                      placement="right"
                      disableHoverListener={isExpanded}
                    >
                      <ListItemButton
                        onClick={func.onClick}
                        sx={{
                          minHeight: 32,
                          justifyContent: "initial",
                          borderRadius: "20px",
                          px: 1,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 3,
                            justifyContent: "center",
                          }}
                        >
                          {func.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={func.label}
                          sx={{
                            opacity: isExpanded ? 1 : 0,
                            transition: "all 0.2s ease-in-out",
                            whiteSpace: "nowrap",
                          }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                ))}
          </List>
        </Paper>
      </Box>

      <SettingsModal open={settingsOpen} onClose={handleSettingsClose} />
      <ProfilePanel
        open={profileOpen}
        onClose={handleProfileClose}
        user={user}
      />
    </>
  );
}
