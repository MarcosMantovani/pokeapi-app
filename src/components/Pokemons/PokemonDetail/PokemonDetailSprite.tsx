import { Box, Paper } from "@mui/material";
import { Pokemon } from "../../../types/pokemon";

interface PokemonDetailSpriteProps {
  pokemon: Pokemon;
}

export function PokemonDetailSprite({ pokemon }: PokemonDetailSpriteProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "20px",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.02)",
        minHeight: "400px",
      }}
    >
      <Box
        component="img"
        src={pokemon.sprites.default}
        alt={pokemon.name}
        sx={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Paper>
  );
}
