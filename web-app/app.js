import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons'; // Biblioteca de ícones

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 1. Cabeçalho de Saudação */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Italo!</Text>
        <View style={styles.profileBadge}>
           <MaterialIcons name="person" size={30} color="#0047AB" />
        </View>
      </View>

      {/* 2. Mapa de Alto Contraste */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -10.9472, // Exemplo: Coordenadas de Aracaju
          longitude: -37.0731,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marcador de Voluntários Próximos (Simulado) */}
        <Marker coordinate={{ latitude: -10.9480, longitude: -37.0740 }} title="Voluntário Disponível" />
      </MapView>

      {/* 3. Área de Ação Principal */}
      <View style={styles.actionArea}>
        <TouchableOpacity 
          style={styles.mainButton}
          accessibilityLabel="Botão para solicitar apoio agora"
          activeOpacity={0.8}
        >
          <MaterialIcons name="pan-tool" size={50} color="#FFF" />
          <Text style={styles.buttonText}>SOLICITAR APOIO AGORA</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Tab Bar Simplificada */}
      <View style={styles.footer}>
        <MaterialIcons name="home" size={32} color="#0047AB" />
        <MaterialIcons name="history" size={32} color="#999" />
        <MaterialIcons name="settings" size={32} color="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF'
  },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  map: { width: '100%', height: '50%' },
  actionArea: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'
  },
  mainButton: {
    backgroundColor: '#FF8C00', // Laranja vibrante definido no briefing
    width: Dimensions.get('window').width * 0.8,
    height: 120, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    elevation: 8, // Sombra para Android
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, // iOS
  },
  buttonText: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 10 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-around', 
    paddingVertical: 15, borderTopWidth: 1, borderColor: '#EEE', backgroundColor: '#FFF'
  }
});