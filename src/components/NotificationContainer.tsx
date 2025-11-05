import { CheckCircle, Close, Error, Info, Warning } from "@mui/icons-material";
import { Alert, Box, Fade, IconButton, Stack } from "@mui/material";
import {
  NotificationType,
  useNotification,
} from "../contexts/NotificationContext";

const getIcon = (type: NotificationType) => {
  switch (type) {
    case "success":
      return <CheckCircle fontSize="inherit" />;
    case "error":
      return <Error fontSize="inherit" />;
    case "warning":
      return <Warning fontSize="inherit" />;
    case "info":
      return <Info fontSize="inherit" />;
    default:
      return <Info fontSize="inherit" />;
  }
};

const getSeverity = (type: NotificationType) => {
  switch (type) {
    case "success":
      return "success";
    case "error":
      return "error";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "info";
  }
};

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        maxWidth: 500,
        width: "90%",
        minWidth: 300,
      }}
    >
      <Stack spacing={2}>
        {notifications.map((notification) => (
          <Fade key={notification.id} in={true} timeout={300}>
            <Alert
              severity={getSeverity(notification.type)}
              icon={getIcon(notification.type)}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => removeNotification(notification.id)}
                >
                  <Close fontSize="small" />
                </IconButton>
              }
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                "& .MuiAlert-message": {
                  width: "100%",
                },
              }}
            >
              {notification.message}
            </Alert>
          </Fade>
        ))}
      </Stack>
    </Box>
  );
}
