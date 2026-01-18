import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { enviarSolicitacao } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let pos = await Location.getCurrentPositionAsync({});
      setLocal(pos.coords);
    })();
  }, []);

  const pedirAjuda = async () => {
    if (!local) return;
    setLoading(true);
    try {
      await enviarSolicitacao({
        usuario_pcd_id: "Italo Farias",
        latitude: local.latitude,
        longitude: local.longitude,
        tipo_ajuda: "Apoio Locomoção"
      });
      navigation.navigate('Historico');
    } catch (e) {
      Alert.alert("Erro", "Verifique se o Backend está rodando no IP 192.168.18.12");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {local ? (
        <MapView style={styles.map} initialRegion={{
          latitude: local.latitude, longitude: local.longitude,
          latitudeDelta: 0.005, longitudeDelta: 0.005
        }}>
          <Marker coordinate={local} title="Italo Farias" />
        </MapView>
      ) : <ActivityIndicator size="large" style={{flex:1}} />}
      
      <TouchableOpacity style={styles.btn} onPress={pedirAjuda}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.txt}>SOLICITAR APOIO</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  btn: { position: 'absolute', bottom: 50, alignSelf: 'center', backgroundColor: '#FF8C00', padding: 20, borderRadius: 30, width: '80%', alignItems: 'center', elevation: 5 },
  txt: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});