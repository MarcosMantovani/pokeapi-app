import { Box, Paper, Typography, Button } from "@mui/material";
import { Pokemon } from "../../types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonPreviewProps {
  pokemon: Pokemon;
  onViewDetails: () => void;
}

export function PokemonPreview({
  pokemon,
  onViewDetails,
}: PokemonPreviewProps) {
  return (
    <Box sx={{ px: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Resultado da Busca
      </Typography>
      <Paper
        elevation={2}
        sx={{
          borderRadius: "20px",
          p: 2,
          maxWidth: "400px",
        }}
      >
        <PokemonCard pokemon={pokemon} onClick={onViewDetails} />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={onViewDetails}
            sx={{
              borderRadius: "20px",
              px: 4,
            }}
            color="primary"
          >
            Ver Detalhes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
