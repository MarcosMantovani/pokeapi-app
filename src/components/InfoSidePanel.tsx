import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  SwipeableDrawer,
} from "@mui/material";
import { ReactNode } from "react";

interface InfoSidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  children: ReactNode;
}

export function InfoSidePanel({
  open,
  onClose,
  title,
  width = 500,
  children,
}: InfoSidePanelProps) {
  const { palette } = useTheme();

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      PaperProps={{
        sx: {
          width,
          maxWidth: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          margin: "20px",
          borderRadius: "20px",
          overflow: "hidden", // importante para o scroll respeitar o border-radius          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: `1px solid ${palette.divider}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: palette.background.paper,
          zIndex: 1,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      {/* Conteúdo rolável */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto", // scroll agora respeita border-radius
          p: 2,
        }}
      >
        {children}
      </Box>
    </SwipeableDrawer>
  );
}
