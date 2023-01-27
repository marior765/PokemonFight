import { action, computed, makeObservable, observable } from 'mobx';
import { IPlayer } from './abstract/player-abstract';
import { fetchRandomPokemon, randomizeInRange } from 'src/shared/utils';
import { Pokemon } from './pokemon';

export class Player implements IPlayer {
  pokemon: Pokemon;

  @observable
  health: number;

  constructor(pokemon: Pokemon) {
    makeObservable(this);

    this.health = 100;
    this.pokemon = pokemon;
  }

  @computed
  get isDead() {
    return this.health === 0;
  }

  @action
  public heal = () => {
    this.health = 100;
  };

  @action
  public takeDamage = (damage: number) => {
    this._reduceHealth(damage);
  };

  private _reduceHealth = (point: number) => {
    if (point > this.health) {
      this.health = 0;
      return;
    }

    this.health = this.health - point;
  };

  static createPlayer = async () => {
    const response = await fetchRandomPokemon();
    const newPokemon = new Pokemon(
      response.name,
      response.sprites.front_default,
    );

    return new Player(newPokemon);
  };
}
