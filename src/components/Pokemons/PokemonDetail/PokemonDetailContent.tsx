import { Box, Paper } from "@mui/material";
import { Pokemon, EvolutionNode } from "../../../types/pokemon";
import { PokemonDetailSprite } from "./PokemonDetailSprite";
import { PokemonDetailInfo } from "./PokemonDetailInfo";
import { PokemonEvolutionChain } from "./PokemonEvolutionChain";

interface PokemonDetailContentProps {
  pokemon: Pokemon;
  evolutionChain?: EvolutionNode | null;
}

export function PokemonDetailContent({
  pokemon,
  evolutionChain,
}: PokemonDetailContentProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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

      {/* Cadeia de Evolução */}
      {evolutionChain && (
        <Paper
          elevation={2}
          sx={{
            borderRadius: "20px",
            p: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
          }}
        >
          <PokemonEvolutionChain evolutionChain={evolutionChain} />
        </Paper>
      )}
    </Box>
  );
}
