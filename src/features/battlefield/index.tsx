import { Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PokemonField } from 'src/shared/components/pokemon-field';
import { Button } from '@rneui/themed';
import { Menu } from 'src/shared/components/pokemon-field/menu';
import { observer } from 'mobx-react';
import battlefieldStore from 'src/core/stores/battlefield-store';

export const BattleField = observer(() => {
  const { player, opponent, isLoading, score } = battlefieldStore;

  const renderButtons = () => {
    if (battlefieldStore.isGameOver)
      return (
        <Button
          title="Reload!"
          style={styles.button}
          onPress={() => battlefieldStore.reloadTheGame()}
        />
      );

    if (battlefieldStore.youWon)
      return (
        <View style={styles.proceedContainer}>
          <Button
            color="green"
            title="Proceed!"
            style={styles.button}
            onPress={() => battlefieldStore.reloadTheGame(false)}
          />
          <Button
            color="blue"
            title="Reload!"
            style={styles.button}
            onPress={() => battlefieldStore.reloadTheGame()}
          />
        </View>
      );

    return (
      <Button
        color="red"
        title="Attack!"
        style={styles.button}
        onPress={battlefieldStore.doMove}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Pokemon Battle Simulator</Text>
      <PokemonField
        isLoading={isLoading}
        value={player}
        title="Player"
        score={score}
      />
      <Menu />
      <PokemonField isLoading={isLoading} value={opponent} title="Opponent" />
      {renderButtons()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    margin: 20,
    alignSelf: 'center',
  },
  activityIndicator: { flex: 1 },
  proceedContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
