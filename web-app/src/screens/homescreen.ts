import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { enviarSolicitacao } from '../services/api';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [localizacao, setLocalizacao] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Aviso", "A permissão de GPS é necessária.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao(location.coords);
    })();
  }, []);

  const handleAjuda = async () => {
    if(!localizacao) return;
    setCarregando(true);
    try {
      const res = await enviarSolicitacao({
        usuario_pcd_id: "Italo Farias",
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        tipo_ajuda: "Auxílio Locomoção"
      });
      navigation.navigate('BuscaVoluntario', { solicitacaoId: res.id });
    } catch (e) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique o IP.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        {localizacao ? (
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map} 
            initialRegion={{
              latitude: localizacao.latitude, 
              longitude: localizacao.longitude,
              latitudeDelta: 0.005, 
              longitudeDelta: 0.005
            }}
          >
            <Marker coordinate={localizacao} />
          </MapView>
        ) : (
          <View style={styles.loadingMap}>
            <ActivityIndicator size="large" color="#0047AB" />
            <Text>Obtendo GPS...</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.btn} onPress={handleAjuda} disabled={carregando || !localizacao}>
          {carregando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>SOLICITAR APOIO AGORA</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnHistory} onPress={() => navigation.navigate('Historico')}>
          <MaterialIcons name="history" size={24} color="#0047AB" />
          <Text style={styles.btnHistoryText}>Ver Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  mapArea: { width: width, height: height * 0.65 },
  map: { ...StyleSheet.absoluteFillObject },
  loadingMap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bottomArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20 },
  btn: { backgroundColor: '#FF8C00', width: width * 0.85, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  btnHistory: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
  btnHistoryText: { color: '#0047AB', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});