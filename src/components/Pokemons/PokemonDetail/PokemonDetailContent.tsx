import { Box } from "@mui/material";
import { Pokemon } from "../../../types/pokemon";
import { PokemonDetailSprite } from "./PokemonDetailSprite";
import { PokemonDetailInfo } from "./PokemonDetailInfo";

interface PokemonDetailContentProps {
  pokemon: Pokemon;
}

export function PokemonDetailContent({ pokemon }: PokemonDetailContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <PokemonDetailSprite pokemon={pokemon} />
      <PokemonDetailInfo pokemon={pokemon} />
    </Box>
  );
}
