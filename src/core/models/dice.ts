import { action, makeObservable, observable } from 'mobx';
import { randomizeInRange } from 'src/shared/utils';

interface GameMove {
  playerMove: number;
  opponentMove: number;
}

const DEFAULT_VALUE = {
  playerMove: 0,
  opponentMove: 0,
};

export class Dice {
  @observable
  lastMove: GameMove;

  constructor() {
    makeObservable(this);

    this.lastMove = DEFAULT_VALUE;
  }

  public makeMove = () => {
    // if (this.lastMove.opponentMove === 6 && this.lastMove.playerMove === 6) {

    // }
    const newMove: GameMove = {
      playerMove:
        this.lastMove.opponentMove === 6 ? 0 : this.createSingleMove(),
      opponentMove:
        this.lastMove.playerMove === 6 ? 0 : this.createSingleMove(),
    };

    this._setLastMove(newMove);

    return newMove;
  };

  @action
  public reload = () => {
    this.lastMove = DEFAULT_VALUE;
  };

  @action
  private _setLastMove = (value: GameMove) => {
    this.lastMove = value;
  };

  private createSingleMove = () => {
    return randomizeInRange(1, 6);
  };
}
