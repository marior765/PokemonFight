import { Pokemon } from '../pokemon';

export interface IPlayer {
  pokemon: Pokemon;
  health: number;
  isDead: boolean;
  takeDamage: (_d: number) => void;
  heal: () => void;
}
