import { Backdrop, CircularProgress, Portal } from "@mui/material";

export function EntirePageLoading({
  isLoading,
  zIndex,
}: {
  isLoading: boolean;
  zIndex: number;
}) {
  return (
    <Portal>
      <Backdrop sx={{ color: "#fff", zIndex: zIndex }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Portal>
  );
}
