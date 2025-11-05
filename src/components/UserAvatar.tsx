import { Person } from "@mui/icons-material";
import { Avatar, AvatarProps, useTheme } from "@mui/material";

interface UserAvatarProps extends Omit<AvatarProps, "children" | "src"> {
  name?: string | null;
  src?: string | null;
}

export function UserAvatar({ name, src, sx, ...props }: UserAvatarProps) {
  const { palette } = useTheme();

  const getInitials = (fullName?: string | null) => {
    if (!fullName) return <Person />;
    return fullName.charAt(0).toUpperCase();
  };

  const defaultSx = {
    background: `linear-gradient(to bottom right, ${palette.info.main}, ${palette.info.dark})`,
    fontSize: {
      xs: "0.75rem",
      md: "1rem",
    },
    ...sx,
  };

  return (
    <Avatar
      src={src || undefined}
      sx={{ ...defaultSx, color: palette.info.contrastText }}
      {...props}
      imgProps={{
        loading: "lazy",
        decoding: "async",
        fetchPriority: "low",
      }}
    >
      {getInitials(name)}
    </Avatar>
  );
}
