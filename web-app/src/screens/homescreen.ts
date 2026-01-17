import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // Estado para armazenar voluntários próximos (virião da sua API FastAPI)
  const [voluntarios, setVoluntarios] = useState([
    { id: 1, lat: -10.9480, lon: -37.0740 },
    { id: 2, lat: -10.9450, lon: -37.0720 },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER: Identidade e Acessibilidade */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, Italo!</Text>
          <Text style={styles.subText}>Você está seguro e conectado.</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="account-circle" size={45} color="#0047AB" />
        </TouchableOpacity>
      </View>

      {/* MAPA: Visão de calor dos voluntários ativos */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -10.9472, // Aracaju/SE
            longitude: -37.0731,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          customMapStyle={mapStyle} // Estilo de alto contraste
        >
          {voluntarios.map(v => (
            <Marker 
              key={v.id}
              coordinate={{ latitude: v.lat, longitude: v.lon }}
            >
              <MaterialIcons name="person-pin-circle" size={35} color="#0047AB" />
            </Marker>
          ))}
        </MapView>
      </View>

      {/* FOOTER: Botão de Ação Central (O "Coração" do App) */}
      <View style={styles.actionArea}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => console.log("Solicitação iniciada")}
          accessibilityLabel="Botão grande para pedir ajuda agora"
          accessibilityRole="button"
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <MaterialIcons name="record-voice-over" size={40} color="#FF8C00" />
          </View>
          <Text style={styles.buttonText}>SOLICITAR APOIO AGORA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Estilo de mapa simplificado para evitar ruído visual (Inclusivo)
const mapStyle = [
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#0047AB' },
  subText: { fontSize: 14, color: '#666' },
  mapContainer: {
    height: height * 0.45,
    width: width,
    overflow: 'hidden',
  },
  map: { ...StyleSheet.absoluteFillObject },
  actionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  mainButton: {
    backgroundColor: '#FF8C00',
    width: width * 0.85,
    height: 140,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
  },
  iconCircle: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  }
});

export default HomeScreen;