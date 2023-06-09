import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text } from '@ui-kitten/components';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ApplicationProvider>
  );
}
