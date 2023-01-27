import { action, computed, makeObservable, observable } from 'mobx';
import { Player } from 'src/core/models/player';
import { Nullable } from 'src/shared/types';
import { IPlayer } from 'src/core/models/abstract/player-abstract';
import { Dice } from 'src/core/models/dice';

class BattleFieldStore {
  @observable
  player: Nullable<IPlayer>;

  @observable
  opponent: Nullable<IPlayer>;

  @observable
  isLoading: boolean;

  @observable
  error: string;

  @observable
  score: number;

  dice: Dice;

  constructor() {
    makeObservable(this);

    this.player = null;
    this.opponent = null;
    this.isLoading = false;
    this.error = '';
    this.score = 0;

    this.dice = new Dice();

    void this._initialStart();
  }

  @computed
  get isGameOver(): Nullable<boolean> {
    if (!this.player) return false;

    return this.player?.isDead;
  }

  @computed
  get youWon(): Nullable<boolean> {
    if (!this.opponent) return false;

    return this.opponent?.isDead;
  }

  public doMove = () => {
    if (!this.player || !this.opponent) return;

    const move = this.dice.makeMove();

    this.player.takeDamage(move.opponentMove);
    this.opponent.takeDamage(move.playerMove);
  };

  public reloadTheGame = async (updatePokemon = true) => {
    if (this.isGameOver) {
      await this._initialStart();
      this._updateScore(0);
      return;
    }
    if (this.youWon && updatePokemon) {
      await this._initialStart();
      this._updateScore(0);
    } else {
      this._updateScore(this.score + 1);
      this.player!.heal();
      await this._reloadOpponent();
    }
    this.dice.reload();
  };

  private _reloadOpponent = async () => {
    this._setLoading(true);
    try {
      const opponent = await Player.createPlayer();

      this._setOpponent(opponent);
      this._setLoading(false);
    } catch (e) {
      const { message } = e as Error;

      this._setError(message);
    }
  };

  private _initialStart = async () => {
    this._setLoading(true);
    try {
      const [player, opponent] = await Promise.all([
        Player.createPlayer(),
        Player.createPlayer(),
      ]);

      this._setPlayers(player, opponent);
      this._setLoading(false);
    } catch (e) {
      const { message } = e as Error;

      this._setError(message);
    }
  };

  @action
  private _setPlayers = (player: Player, opponent: Player) => {
    this.player = player;
    this.opponent = opponent;
  };

  @action
  private _setOpponent = (opponent: Player) => {
    this.opponent = opponent;
  };

  @action
  private _updateScore = (value: number) => {
    this.score = value;
  };

  @action
  private _setLoading = (value: boolean) => {
    if (value) {
      this.error = '';
    }
    this.isLoading = value;
  };

  @action
  private _setError = (value: string) => {
    this.error = value;
    this.isLoading = false;
  };
}

export default new BattleFieldStore();
