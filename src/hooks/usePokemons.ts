import { useCallback } from "react";
import { useAuthenticatedRequest } from "./useAuthenticatedRequest";
import { PaginatedPokemons } from "../types/api";
import { EvolutionNode, Pokemon } from "../types/pokemon";

interface ListPokemonsParams {
  limit?: number;
  offset?: number;
}

interface UsePokemonsReturn {
  list_pokemons: (params?: ListPokemonsParams) => Promise<PaginatedPokemons>;
  get_pokemon: (pokemon_external_id_or_name: string) => Promise<Pokemon>;
  favorite_pokemon: (pokemon_external_id_or_name: string) => Promise<Pokemon>;
  unfavorite_pokemon: (pokemon_external_id_or_name: string) => Promise<Pokemon>;
  list_favorite_pokemons: () => Promise<PaginatedPokemons>;
  get_evolution_chain: (
    pokemon_external_id_or_name: string,
  ) => Promise<EvolutionNode>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export const usePokemons = (): UsePokemonsReturn => {
  const { execute, loading, error, reset } = useAuthenticatedRequest<
    PaginatedPokemons | Pokemon | EvolutionNode
  >();

  const list_pokemons = useCallback(
    async (params?: ListPokemonsParams): Promise<PaginatedPokemons> => {
      const queryParams = new URLSearchParams();

      if (params?.limit !== undefined) {
        queryParams.append("limit", params.limit.toString());
      }

      if (params?.offset !== undefined) {
        queryParams.append("offset", params.offset.toString());
      }

      const queryString = queryParams.toString();
      const endpoint = `/api/pokemons/pokemons/${queryString ? `?${queryString}` : ""}`;

      return (await execute(endpoint)) as PaginatedPokemons;
    },
    [execute],
  );

  const get_pokemon = useCallback(
    async (pokemon_external_id_or_name: string): Promise<Pokemon> => {
      const formatted = pokemon_external_id_or_name.trim().toLowerCase();
      const endpoint = `/api/pokemons/pokemons/${formatted}/`;
      return (await execute(endpoint)) as Pokemon;
    },
    [execute],
  );

  const favorite_pokemon = useCallback(
    async (pokemon_external_id_or_name: string): Promise<Pokemon> => {
      const formatted = pokemon_external_id_or_name.trim().toLowerCase();
      const endpoint = `/api/pokemons/pokemons/${formatted}/favorite/`;
      return (await execute(endpoint, { method: "POST" })) as Pokemon;
    },
    [execute],
  );

  const unfavorite_pokemon = useCallback(
    async (pokemon_external_id_or_name: string): Promise<Pokemon> => {
      const formatted = pokemon_external_id_or_name.trim().toLowerCase();
      const endpoint = `/api/pokemons/pokemons/${formatted}/unfavorite/`;
      return (await execute(endpoint, { method: "POST" })) as Pokemon;
    },
    [execute],
  );

  const list_favorite_pokemons =
    useCallback(async (): Promise<PaginatedPokemons> => {
      const endpoint = `/api/pokemons/favorited-pokemons/`;
      return (await execute(endpoint)) as PaginatedPokemons;
    }, [execute]);

  const get_evolution_chain = useCallback(
    async (pokemon_external_id_or_name: string): Promise<EvolutionNode> => {
      const formatted = pokemon_external_id_or_name.trim().toLowerCase();
      const endpoint = `/api/pokemons/evolution-chains/${formatted}/`;
      return (await execute(endpoint)) as EvolutionNode;
    },
    [execute],
  );

  return {
    list_pokemons,
    get_pokemon,
    favorite_pokemon,
    unfavorite_pokemon,
    list_favorite_pokemons,
    get_evolution_chain,
    loading,
    error,
    reset,
  };
};
