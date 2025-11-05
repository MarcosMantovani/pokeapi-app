import { Box, Typography } from "@mui/material";
import { Pokemon } from "../../../types/pokemon";

interface PokemonDetailHeaderProps {
  pokemon: Pokemon;
}

export function PokemonDetailHeader({ pokemon }: PokemonDetailHeaderProps) {
  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {pokemon.name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          N° {pokemon.external_id.toString().padStart(4, "0")}
        </Typography>
      </Box>
    </Box>
  );
}
