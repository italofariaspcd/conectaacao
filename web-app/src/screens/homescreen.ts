import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, TouchableOpacity, Dimensions, 
  SafeAreaView, Alert, ActivityIndicator 
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { enviarSolicitacao } from '../services/api';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [carregando, setCarregando] = useState(false);
  const [localizacao, setLocalizacao] = useState(null);
  const [erroMsg, setErroMsg] = useState(null);

  // Hook para capturar localização ao iniciar
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErroMsg('Permissão de localização negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao(location.coords);
    })();
  }, []);

  const lidarComSolicitacao = async () => {
    if (!localizacao) {
      Alert.alert("Aguarde", "Ainda estamos a obter a sua localização GPS.");
      return;
    }

    setCarregando(true);
    try {
      const payload = {
        usuario_pcd_id: "italo_lopes_farias",
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        tipo_ajuda: "Apoio Geral"
      };

      const resultado = await enviarSolicitacao(payload);
      navigation.navigate('BuscaVoluntario', { solicitacaoId: resultado.id });
      
    } catch (err) {
      Alert.alert("Erro", "Verifique se o seu servidor FastAPI está ligado.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, Italo!</Text>
          <Text style={styles.subText}>
            {localizacao ? "Localização Ativa" : "A obter GPS..."}
          </Text>
        </View>
        <MaterialIcons name="account-circle" size={45} color="#0047AB" />
      </View>

      <View style={styles.mapContainer}>
        {localizacao ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: localizacao.latitude,
              longitude: localizacao.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker coordinate={localizacao}>
              <View style={styles.markerPCD}>
                <MaterialIcons name="accessible" size={30} color="#FFF" />
              </View>
            </Marker>
          </MapView>
        ) : (
          <View style={styles.loadingMap}>
            <ActivityIndicator size="large" color="#0047AB" />
          </View>
        )}
      </View>

      <View style={styles.actionArea}>
        <TouchableOpacity 
          style={[styles.mainButton, (!localizacao || carregando) && styles.buttonDisabled]}
          onPress={lidarComSolicitacao}
          disabled={!localizacao || carregando}
        >
          {carregando ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            <>
              <View style={styles.iconCircle}>
                <MaterialIcons name="front-hand" size={40} color="#FF8C00" />
              </View>
              <Text style={styles.buttonText}>SOLICITAR APOIO AGORA</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#0047AB' },
  subText: { fontSize: 14, color: '#666' },
  mapContainer: { height: height * 0.45, width: width },
  map: { ...StyleSheet.absoluteFillObject },
  loadingMap: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE' },
  markerPCD: { backgroundColor: '#0047AB', padding: 5, borderRadius: 20, borderWidth: 2, borderColor: '#FFF' },
  actionArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainButton: {
    backgroundColor: '#FF8C00', width: width * 0.85, height: 160,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8
  },
  buttonDisabled: { backgroundColor: '#CCC' },
  iconCircle: { backgroundColor: '#FFF', padding: 12, borderRadius: 50, marginBottom: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '900' }
});

export default HomeScreen;