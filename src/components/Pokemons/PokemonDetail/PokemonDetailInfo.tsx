import { Box, Typography, Chip, Stack } from "@mui/material";
import { Pokemon } from "../../../types/pokemon";
import { PokemonTypeChip } from "../PokemonTypeChip";

interface PokemonDetailInfoProps {
  pokemon: Pokemon;
}

export function PokemonDetailInfo({ pokemon }: PokemonDetailInfoProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Flavor Text */}
      <Typography variant="h6" sx={{ lineHeight: 1.8, fontSize: "1.25rem" }}>
        {pokemon.flavor_text}
      </Typography>

      {/* Altura, Peso e Habilidades */}
      <Box
        sx={{
          borderRadius: "20px",
          p: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
        }}
      >
        <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Altura
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {pokemon.height / 10} m
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Peso
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {pokemon.weight / 10} kg
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Habilidades
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {pokemon.abilities.map((ability) => (
            <Chip
              key={ability}
              label={ability}
              size="medium"
              sx={{
                borderRadius: "10px",
                textTransform: "capitalize",
              }}
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>

      {/* Tipos */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Tipo
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {pokemon.types.map((type) => (
            <PokemonTypeChip key={type} type={type} size="large" />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
