import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importação das telas que criamos
import HomeScreen from './src/screens/HomeScreen';
import BuscaScreen from './src/screens/BuscaScreen';

// Inicialização do Navegador em Pilha (Stack)
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Mantemos o topo limpo para nosso design customizado
            cardStyle: { backgroundColor: '#FFFFFF' },
            // Transição suave entre telas
            gestureEnabled: true,
          }}
        >
          {/* Tela 1: Home com o botão de solicitação */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          
          {/* Tela 2: Radar de busca por voluntários */}
          <Stack.Screen 
            name="BuscaVoluntario" 
            component={BuscaScreen} 
          />
          
          {/* Futura Tela 3: Perfil do Voluntário (Match) */}
          {/* <Stack.Screen name="Match" component={MatchScreen} /> */}
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}