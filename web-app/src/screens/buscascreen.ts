import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BuscaScreen = ({ navigation }) => {
  // Configuração da animação do radar
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop infinito da animação de pulso
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolação para o tamanho e opacidade do círculo
  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 4],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscando Voluntários...</Text>
      <Text style={styles.subtitle}>Enviando seu sinal para pessoas próximas em Aracaju.</Text>

      <View style={styles.radarContainer}>
        {/* Círculo Animado (Radar) */}
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
        
        {/* Ícone Central Estático */}
        <View style={styles.centerCircle}>
          <MaterialIcons name="sensors" size={50} color="#FFF" />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>CANCELAR SOLICITAÇÃO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0047AB', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 50 },
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
  },
  pulse: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0047AB',
  },
  centerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0047AB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  cancelButton: {
    marginTop: 80,
    padding: 15,
  },
  cancelText: {
    color: '#FF0000',
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});

export default BuscaScreen;