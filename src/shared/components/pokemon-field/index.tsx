import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { Component, Nullable } from 'src/shared/types';
import { HealthLine } from './healthline';
import { IPlayer } from 'src/core/models/abstract/player-abstract';
import { observer } from 'mobx-react';

interface PokemonFieldProps {
  value: Nullable<IPlayer>;
  title: 'Player' | 'Opponent';
  isLoading: boolean;
  score?: number;
}

export const PokemonField: Component<PokemonFieldProps> = observer(
  ({ title, value, isLoading, score }) => {
    const renderScore = () => {
      if (!score) return null;

      return <Text>Score: {score}</Text>;
    };

    const renderBody = () => {
      if (!value || isLoading)
        return (
          <View
            style={StyleSheet.flatten([
              styles.container,
              styles.loadingContainer,
            ])}>
            <ActivityIndicator style={styles.activityIndicator} />
          </View>
        );

      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text>
              {title}: {value.pokemon.name}
            </Text>
            {renderScore()}
          </View>
          <HealthLine healthpoints={value.health} />
          <Image
            source={{ uri: value.pokemon.source }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      );
    };

    return renderBody();
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    padding: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
  },
  activityIndicator: { alignSelf: 'center' },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
