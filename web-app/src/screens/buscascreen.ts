import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api'; // Sua instância do Axios

const BuscaScreen = ({ route, navigation }) => {
  // Pegamos o ID da solicitação enviado pela HomeScreen
  const { solicitacaoId } = route.params;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const [tentativas, setTentativas] = useState(0);

  useEffect(() => {
    // 1. Inicia a animação do radar
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    ).start();

    // 2. Configura o Polling (Verifica o status a cada 3 segundos)
    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/solicitacoes/${solicitacaoId}`);
        
        console.log("Status atual:", response.data.status);

        if (response.data.status === 'atendido') {
          clearInterval(interval);
          navigation.navigate('Match', { voluntario: response.data.voluntario_atribuido });
        }
      } catch (error) {
        console.error("Erro no polling:", error);
      }
      setTentativas(t => t + 1);
    }, 3000);

    // Limpa o intervalo se o usuário sair da tela ou cancelar
    return () => clearInterval(interval);
  }, [solicitacaoId]);

  // Interpolações para o Radar
  const scale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 4] });
  const opacity = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscando...</Text>
      <Text style={styles.subtitle}>Aguardando um voluntário aceitar o chamado.</Text>

      <View style={styles.radarContainer}>
        <Animated.View style={[styles.pulse, { transform: [{ scale }], opacity }]} />
        <View style={styles.centerCircle}>
          <MaterialIcons name="wifi-tethering" size={50} color="#FFF" />
        </View>
      </View>

      <Text style={styles.counterText}>Tempo de busca: {tentativas * 3}s</Text>

      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>CANCELAR PEDIDO</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (Estilos permanecem os mesmos da versão anterior)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#0047AB' },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10, marginBottom: 40 },
    radarContainer: { alignItems: 'center', justifyContent: 'center', height: 200, width: 200 },
    pulse: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: '#0047AB' },
    centerCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#0047AB', alignItems: 'center', justifyContent: 'center', elevation: 5 },
    counterText: { marginTop: 20, color: '#999', fontSize: 12 },
    cancelButton: { marginTop: 60 },
    cancelText: { color: '#FF3B30', fontWeight: 'bold' }
});

export default BuscaScreen;