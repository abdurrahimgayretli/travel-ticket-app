import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import SignUp from './pages/SignUp';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './components/NavigationStack';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View className="flex-1 bg-white">
          <NavigationStack />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}
