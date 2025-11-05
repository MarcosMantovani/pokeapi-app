import React from "react";
import { COLLAPSED_FUNCTIONS_SIDEBAR_TOTAL_WIDTH } from "../routes";
import { Box, SxProps, Theme } from "@mui/material";

interface BasePageLayoutProps {
  children: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  children,
  className = "",
  sx = {},
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "100vw",
        width: { xs: "100%", md: "100%" },
        pl: { xs: 0, md: `${COLLAPSED_FUNCTIONS_SIDEBAR_TOTAL_WIDTH}px` },
        pr: { xs: 0, md: "24px" },
        pb: { xs: "80px", md: 2 }, // Padding bottom no mobile para a barra inferior
        pt: 2,
        ...sx,
      }}
      className={className}
    >
      {children}
    </Box>
  );
};

export default BasePageLayout;
