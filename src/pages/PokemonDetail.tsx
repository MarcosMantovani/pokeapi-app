import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import BasePageLayout from "../components/BasePageLayout";
import { usePokemons } from "../hooks/usePokemons";
import { Pokemon, EvolutionNode } from "../types/pokemon";
import PokeballLoader from "../components/PokeballLoader/PokeballLoader";
import { PokemonDetailHeader } from "../components/Pokemons/PokemonDetail/PokemonDetailHeader";
import { PokemonDetailContent } from "../components/Pokemons/PokemonDetail/PokemonDetailContent";

const PokemonDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { get_pokemon, get_evolution_chain, loading } = usePokemons();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionNode | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);

  const handlePokemonUpdate = (updatedPokemon: Pokemon) => {
    setPokemon(updatedPokemon);
  };

  useEffect(() => {
    const loadPokemon = async () => {
      setLoadingPokemon(true);
      if (!name) {
        navigate("/");
        return;
      }

      try {
        setError(null);
        const [pokemonData, evolutionData] = await Promise.all([
          get_pokemon(name),
          get_evolution_chain(name).catch(() => null),
        ]);
        setPokemon(pokemonData);
        setEvolutionChain(evolutionData);
      } catch (err: any) {
        console.error("Erro ao carregar pokémon:", err);
        setError("Pokémon não encontrado");
      } finally {
        setLoadingPokemon(false);
      }
    };

    loadPokemon();
  }, [name, get_pokemon, get_evolution_chain, navigate]);

  if (loading || loadingPokemon) {
    return (
      <BasePageLayout sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <PokeballLoader />
        </Box>
      </BasePageLayout>
    );
  }

  if (error || !pokemon) {
    return (
      <BasePageLayout sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            {error || "Pokémon não encontrado"}
          </Paper>
        </Box>
      </BasePageLayout>
    );
  }

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
        <Box sx={{ maxWidth: "1200px", width: "100%", mx: "auto", p: 4 }}>
          <PokemonDetailHeader
            pokemon={pokemon}
            onPokemonUpdate={handlePokemonUpdate}
          />
          <PokemonDetailContent
            pokemon={pokemon}
            evolutionChain={evolutionChain}
          />
        </Box>
      </Paper>
    </BasePageLayout>
  );
};

export default PokemonDetail;
