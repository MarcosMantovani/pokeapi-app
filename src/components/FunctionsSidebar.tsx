import { Favorite, Logout, Pets, Settings } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  useMediaQuery,
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
  const isMobile = useMediaQuery("(max-width:900px)");

  const [isExpanded, setIsExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout, user } = useAuth();

  // No mobile, sempre expandido
  const effectiveIsExpanded = isMobile ? true : isExpanded;

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
      {
        icon: <Favorite />,
        label: "Favoritos",
        onClick: () => {
          navigate("/favorites");
        },
        has_permission: () => true,
        isActive: () => location.pathname === "/favorites",
      },
    ],
    [location.pathname, navigate],
  );

  const bottomFunctions = useMemo(
    () => [
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
    ],
    [handleSettings, handleProfileOpen, handleLogout, user],
  );

  // Combinar todas as funções para mobile (barra horizontal)
  const allFunctions = useMemo(
    () => [...functions, ...bottomFunctions],
    [functions, bottomFunctions],
  );

  return (
    <>
      <Box
        className={className}
        sx={{
          position: "fixed",
          ...(isMobile
            ? {
                left: 0,
                right: 0,
                bottom: 0,
                top: "auto",
                height: "auto",
                width: "100%",
              }
            : {
                left: 24,
                top: 16,
                bottom: 16,
                width: collapsedWidth,
              }),
          zIndex: 1300,
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: isMobile ? "center" : "space-between",
        }}
      >
        <Paper
          elevation={isMobile ? 8 : 1}
          sx={{
            position: "absolute",
            ...(isMobile
              ? {
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: "auto",
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px 20px 0 0",
                  py: 1,
                }
              : {
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: effectiveIsExpanded ? expandedWidth : collapsedWidth,
                }),
            zIndex: 1301,
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            justifyContent: isMobile ? "space-around" : "space-between",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            ...(isMobile ? {} : { py: 2, borderRadius: "20px" }),
          }}
        >
          {isMobile ? (
            // Layout mobile: barra horizontal na parte inferior
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                px: 0,
                py: 0,
              }}
            >
              {user &&
                allFunctions
                  .filter((func: any) => func.has_permission?.(user) ?? true)
                  .map((func: any, index: number) => (
                    <ListItem key={index} disablePadding sx={{ flex: 1 }}>
                      <Tooltip title={func.label ?? ""} placement="top">
                        <ListItemButton
                          onClick={func.onClick}
                          selected={func.isActive?.() ?? false}
                          sx={{
                            flexDirection: "column",
                            minHeight: 64,
                            py: 1,
                            px: 0.5,
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
                              justifyContent: "center",
                              mb: 0.5,
                            }}
                          >
                            {func.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={func.label}
                            primaryTypographyProps={{
                              variant: "caption",
                              sx: { fontSize: "0.7rem", textAlign: "center" },
                            }}
                          />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  ))}
            </List>
          ) : (
            // Layout desktop: sidebar vertical colapsável
            <>
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
                        effectiveIsExpanded
                          ? "Toque para recolher"
                          : "Toque para expandir"
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
                          disableHoverListener={effectiveIsExpanded}
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
                                opacity: effectiveIsExpanded ? 1 : 0,
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
                          disableHoverListener={effectiveIsExpanded}
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
                                opacity: effectiveIsExpanded ? 1 : 0,
                                transition: "all 0.2s ease-in-out",
                                whiteSpace: "nowrap",
                              }}
                            />
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>
                    ))}
              </List>
            </>
          )}
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
