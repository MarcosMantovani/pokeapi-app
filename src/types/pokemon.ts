export interface PokemonSprite {
  default: string;
  shiny: string;
}

export interface Pokemon {
  id: number;
  external_id: number;
  name: string;
  flavor_text: string;
  sprites: PokemonSprite;
  abilities: string[];
  height: number;
  weight: number;
  types: string[];
  cry: string;
  is_favorited: boolean;
}
