import React from 'react';
import { SafeAreaView } from 'react-native';
import { Page } from 'src/shared/types';

export const RootProvider: Page<{}> = ({ children }) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};
