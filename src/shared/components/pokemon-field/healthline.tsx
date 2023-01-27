import React, { useEffect, useRef } from 'react';
import { Component } from 'src/shared/types';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { normalize } from '@rneui/themed';

interface HealthLineProps {
  healthpoints: number;
}

const MAX_POINTS = 100;

export const HealthLine: Component<HealthLineProps> = ({ healthpoints }) => {
  const animatedWidth = useRef(new Animated.Value(330)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: healthpoints * 3.3,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [animatedWidth, healthpoints]);

  const renderHealth = () => {
    return (
      <View style={styles.healthContainer}>
        <Animated.View
          style={[
            styles.healthLine,
            {
              width: animatedWidth,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHealth()}
      <Text>
        {healthpoints}/{MAX_POINTS}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(10),
  },
  healthContainer: {
    height: normalize(25),
    borderWidth: StyleSheet.hairlineWidth,
  },
  healthLine: {
    flex: 1,
    backgroundColor: 'green',
  },
});
