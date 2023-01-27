import { normalize } from '@rneui/themed';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import battlefieldStore from 'src/core/stores/battlefield-store';

export const Menu = observer(() => {
  const { isGameOver, youWon, dice } = battlefieldStore;

  const renderBody = () => {
    if (isGameOver) return <Text>Game Over</Text>;

    if (youWon) return <Text>Congratulations!</Text>;

    return (
      <View style={styles.diceContainer}>
        <View style={styles.dice}>
          <Text>Your move: </Text>
          <Text>
            {dice.lastMove.playerMove ? dice.lastMove.playerMove : '-'}
          </Text>
        </View>
        <View style={styles.dice}>
          <Text>
            {dice.lastMove.opponentMove ? dice.lastMove.opponentMove : '-'}
          </Text>
          <Text>Opponent move: </Text>
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{renderBody()}</View>;
});

const styles = StyleSheet.create({
  container: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
  diceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dice: {
    width: normalize(100),
    height: normalize(100),
    fontSize: normalize(25),
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
