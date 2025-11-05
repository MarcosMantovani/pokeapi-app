import { useState, useEffect, useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePokemons } from "../hooks/usePokemons";
import { Pokemon } from "../types/pokemon";
import { PokemonSearchBar } from "./Pokemons/PokemonSearchBar";
import { PokemonCarousel } from "./Pokemons/PokemonCarousel";
import PokeballLoader from "./PokeballLoader/PokeballLoader";

export function MainLayout() {
  const navigate = useNavigate();
  const { list_pokemons, get_pokemon, loading } = usePokemons();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoadingPokemons(true);
      try {
        const response = await list_pokemons({ limit: 10, offset: 0 });
        setPokemons(response.results);
        setHasMore(response.next !== null);
        setOffset(10);
      } catch (error) {
        console.error("Erro ao carregar pokémons:", error);
      } finally {
        setIsLoadingPokemons(false);
      }
    };

    loadPokemons();
  }, [list_pokemons]);

  const handleSearch = useCallback(
    async (query: string) => {
      try {
        const pokemon = await get_pokemon(query);
        navigate(`/pokemon/${pokemon.name}/`);
      } catch (error) {
        console.error("Erro ao buscar pokémon:", error);
      }
    },
    [get_pokemon, navigate],
  );

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
      const response = await list_pokemons({ limit: 10, offset });
      setPokemons((prev) => [...prev, ...response.results]);
      setHasMore(response.next !== null);
      setOffset((prev) => prev + 10);
    } catch (error) {
      console.error("Erro ao carregar mais pokémons:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [list_pokemons, offset, hasMore, isLoadingMore]);

  return (
    <Paper
      elevation={1}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        // p: 4,
        overflow: "auto",
      }}
    >
      <Box sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Pokédex
          </Typography>

          <PokemonSearchBar onSearch={handleSearch} loading={loading} />
        </Box>

        {isLoadingPokemons ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <PokeballLoader />
          </Box>
        ) : (
          <PokemonCarousel
            pokemons={pokemons}
            onPokemonClick={handlePokemonClick}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </Box>
    </Paper>
  );
}
