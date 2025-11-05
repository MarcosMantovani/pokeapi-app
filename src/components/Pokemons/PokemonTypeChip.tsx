import { Chip, ChipProps } from "@mui/material";
import { getPokemonTypeColor } from "../../utils/pokemonTypes";

interface PokemonTypeChipProps extends Omit<ChipProps, "size"> {
  type: string;
  size?: "small" | "medium" | "large";
}

export function PokemonTypeChip({
  type,
  size = "medium",
  sx,
  ...props
}: PokemonTypeChipProps) {
  const typeColor = getPokemonTypeColor(type);

  const sizeStyles = {
    small: {
      fontSize: "0.75rem",
      padding: "4px 8px",
      height: "24px",
    },
    medium: {
      fontSize: "0.875rem",
      padding: "6px 12px",
      height: "32px",
    },
    large: {
      fontSize: "1rem",
      padding: "8px 16px",
      height: "40px",
    },
  };

  return (
    <Chip
      label={type}
      sx={{
        borderRadius: "10px",
        textTransform: "capitalize",
        fontWeight: 500,
        backgroundColor: typeColor,
        color: "#FFFFFF",
        ...sizeStyles[size],
        ...sx,
      }}
      {...props}
    />
  );
}
