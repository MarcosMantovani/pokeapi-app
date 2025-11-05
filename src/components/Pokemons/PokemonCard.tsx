import { Card, CardContent, Box, Typography, Chip, Stack } from "@mui/material";
import { Pokemon } from "../../types/pokemon";
import { PokemonTypeChip } from "./PokemonTypeChip";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: "20px",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
              boxShadow: 4,
            }
          : {},
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <Box
          component="img"
          src={pokemon.sprites.default}
          alt={pokemon.name}
          sx={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
          }}
        />
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            mb: 0.5,
          }}
        >
          {pokemon.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          #{pokemon.external_id.toString().padStart(3, "0")}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block" }}
          >
            Tipos:
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
          >
            {pokemon.types.map((type) => (
              <PokemonTypeChip key={type} type={type} size="small" />
            ))}
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block" }}
          >
            Habilidades:
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", gap: 0.5 }}
          >
            {pokemon.abilities.map((ability) => (
              <Chip
                key={ability}
                label={ability}
                size="small"
                sx={{
                  borderRadius: "10px",
                  textTransform: "capitalize",
                }}
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
