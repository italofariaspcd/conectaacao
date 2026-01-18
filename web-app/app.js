import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das suas telas (Certifique-se que os nomes das pastas estão corretos)
import HomeScreen from './src/screens/HomeScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0047AB' }, // Azul padrão para o App
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Conecta Ação - Início' }} 
        />
        <Stack.Screen 
          name="Historico" 
          component={HistoricoScreen} 
          options={{ title: 'Minhas Solicitações' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}