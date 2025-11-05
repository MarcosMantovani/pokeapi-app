import { Pokemon } from "./pokemon";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type PaginatedPokemons = PaginatedResponse<Pokemon>;
