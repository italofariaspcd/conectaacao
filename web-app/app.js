import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import BuscaScreen from './src/screens/BuscaScreen';
import MatchScreen from './src/screens/MatchScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BuscaVoluntario" component={BuscaScreen} />
          <Stack.Screen name="Match" component={MatchScreen} />
          <Stack.Screen name="Historico" component={HistoricoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}