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
      if (status !== 'granted') return;
      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao(location.coords);
    })();
  }, []);

  const handleAjuda = async () => {
    setCarregando(true);
    try {
      const res = await enviarSolicitacao({
        usuario_pcd_id: "Italo Farias",
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        tipo_ajuda: "Auxílio Geral"
      });
      navigation.navigate('BuscaVoluntario', { solicitacaoId: res.id });
    } catch (e) { Alert.alert("Erro", "Falha ao conectar com o servidor."); }
    finally { setCarregando(false); }
  };

  return (
    <View style={styles.container}>
      {localizacao ? (
        <MapView style={styles.map} initialRegion={{
          latitude: localizacao.latitude, longitude: localizacao.longitude,
          latitudeDelta: 0.005, longitudeDelta: 0.005
        }}>
          <Marker coordinate={localizacao} title="Você está aqui" />
        </MapView>
      ) : <ActivityIndicator size="large" style={{flex:1}} />}

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.btn} onPress={handleAjuda} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>SOLICITAR APOIO</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Historico')}>
          <Text style={{color: '#0047AB', marginTop: 15}}>Ver Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: width, height: height * 0.6 },
  bottomArea: { flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  btn: { backgroundColor: '#FF8C00', width: width * 0.8, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  btnText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' }
});