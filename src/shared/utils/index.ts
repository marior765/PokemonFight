import { POKEMON_API, POKEMON_RANGE } from 'src/core/config';
import { PokemonResponse } from 'src/shared/types';

export const randomizeInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const fetchRandomPokemon = async () => {
  const radnomId = randomizeInRange(1, Number(POKEMON_RANGE));

  const response = await fetch(`${POKEMON_API}/pokemon/${radnomId}/`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const parsed = response.json() as Promise<PokemonResponse>;

  return parsed;
};
