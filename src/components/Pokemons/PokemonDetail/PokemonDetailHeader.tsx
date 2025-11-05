import { useState, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Pokemon } from "../../../types/pokemon";
import { usePokemons } from "../../../hooks/usePokemons";
import { useNotification } from "../../../contexts";

interface PokemonDetailHeaderProps {
  pokemon: Pokemon;
  onPokemonUpdate?: (pokemon: Pokemon) => void;
}

export function PokemonDetailHeader({
  pokemon,
  onPokemonUpdate,
}: PokemonDetailHeaderProps) {
  const { favorite_pokemon, unfavorite_pokemon } = usePokemons();
  const { showNotification } = useNotification();
  const [isFavorite, setIsFavorite] = useState(pokemon.is_favorited);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(pokemon.is_favorited);
  }, [pokemon.is_favorited]);

  const handleToggleFavorite = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      let updatedPokemon: Pokemon;
      if (isFavorite) {
        updatedPokemon = await unfavorite_pokemon(pokemon.name);
        showNotification("info", "Pokémon removido dos favoritos");
      } else {
        updatedPokemon = await favorite_pokemon(pokemon.name);
        showNotification("success", "Pokémon adicionado aos favoritos");
      }
      setIsFavorite(updatedPokemon.is_favorited);
      onPokemonUpdate?.(updatedPokemon);
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar:", error);
      showNotification("error", "Erro ao atualizar favorito");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
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
        <Tooltip
          title={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          <IconButton
            onClick={handleToggleFavorite}
            disabled={isLoading}
            sx={{
              color: isFavorite ? "error.main" : "action.disabled",

              "&:hover": {
                color: isFavorite ? "error.dark" : "error.main",
              },
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
