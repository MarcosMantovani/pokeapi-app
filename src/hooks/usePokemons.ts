import { useCallback } from "react";
import { useAuthenticatedRequest } from "./useAuthenticatedRequest";
import { PaginatedPokemons } from "../types/api";
import { Pokemon } from "../types/pokemon";

interface ListPokemonsParams {
  limit?: number;
  offset?: number;
}

interface UsePokemonsReturn {
  list_pokemons: (params?: ListPokemonsParams) => Promise<PaginatedPokemons>;
  get_pokemon: (pokemon_external_id_or_name: string) => Promise<Pokemon>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export const usePokemons = (): UsePokemonsReturn => {
  const { execute, loading, error, reset } = useAuthenticatedRequest<
    PaginatedPokemons | Pokemon
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

  return {
    list_pokemons,
    get_pokemon,
    loading,
    error,
    reset,
  };
};
