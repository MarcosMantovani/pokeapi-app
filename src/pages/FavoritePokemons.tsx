import { useState, useEffect, useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasePageLayout from "../components/BasePageLayout";
import { usePokemons } from "../hooks/usePokemons";
import { Pokemon } from "../types/pokemon";
import { PokemonCarousel } from "../components/Pokemons/PokemonCarousel";
import PokeballLoader from "../components/PokeballLoader/PokeballLoader";

const FavoritePokemons = () => {
  const navigate = useNavigate();
  const { list_favorite_pokemons } = usePokemons();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoadingPokemons(true);
      try {
        const response = await list_favorite_pokemons();
        setPokemons(response.results);
        setHasMore(response.next !== null);
      } catch (error) {
        console.error("Erro ao carregar pokémons favoritos:", error);
      } finally {
        setIsLoadingPokemons(false);
      }
    };

    loadPokemons();
  }, [list_favorite_pokemons]);

  const handlePokemonClick = useCallback(
    (pokemon: Pokemon) => {
      navigate(`/pokemon/${pokemon.name}/`);
    },
    [navigate],
  );

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const response = await list_favorite_pokemons();
      setPokemons(response.results);
      setHasMore(response.next !== null);
    } catch (error) {
      console.error("Erro ao carregar mais pokémons favoritos:", error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [list_favorite_pokemons, isLoadingMore, hasMore]);

  return (
    <BasePageLayout sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            width: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Pokémons Favoritos
          </Typography>

          {isLoadingPokemons ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <PokeballLoader />
            </Box>
          ) : pokemons.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Nenhum pokémon favoritado ainda
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <PokemonCarousel
                pokemons={pokemons}
                onPokemonClick={handlePokemonClick}
                onLoadMore={handleLoadMore}
                isLoadingMore={isLoadingMore}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </BasePageLayout>
  );
};

export default FavoritePokemons;
