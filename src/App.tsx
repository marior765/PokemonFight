/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import { BattleField } from './features/battlefield';
import { RootProvider } from './shared/provider';

const App = () => {
  return (
    <RootProvider>
      <BattleField />
    </RootProvider>
  );
};

export default App;
