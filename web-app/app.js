import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

// Importação das telas do projeto
import HomeScreen from './src/screens/HomeScreen';
import BuscaScreen from './src/screens/BuscaScreen';
import MatchScreen from './src/screens/MatchScreen';

// Criação do navegador em pilha
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Configuração da Barra de Status para visibilidade em telas claras */}
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,           // Removemos o cabeçalho padrão para usar o nosso customizado
            cardStyle: { backgroundColor: '#FFFFFF' },
            gestureEnabled: true,         // Permite o gesto de "voltar" no iOS
            animationEnabled: true,       // Ativa transições suaves entre telas
          }}
        >
          {/* 1. Tela Inicial: Ponto de partida para o usuário PCD */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          
          {/* 2. Tela de Busca: Radar animado com Polling para o Backend FastAPI */}
          <Stack.Screen 
            name="BuscaVoluntario" 
            component={BuscaScreen} 
          />
          
          {/* 3. Tela de Match: Exibe os dados do voluntário após o aceite */}
          <Stack.Screen 
            name="Match" 
            component={MatchScreen} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}