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
        width: { xs: "calc(100vw - 48px)", md: "100%" },
        pl: `${COLLAPSED_FUNCTIONS_SIDEBAR_TOTAL_WIDTH}px`,
        pr: "24px",
        py: 2,
        ...sx,
      }}
      className={className}
    >
      {children}
    </Box>
  );
};

export default BasePageLayout;
