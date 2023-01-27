import { PropsWithChildren, FC } from 'react';

export type Page<P> = FC<PropsWithChildren<Readonly<P>>>;

export type Component<P> = FC<Readonly<P>>;

export type Nullable<T> = T | null;

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}
