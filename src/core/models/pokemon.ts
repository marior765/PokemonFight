import { IPokemon } from './abstract/pokemon-abstract';

export class Pokemon implements IPokemon {
  name: string;

  source: string;

  constructor(name: string, source: string) {
    this.name = name;
    this.source = source;
  }
}
