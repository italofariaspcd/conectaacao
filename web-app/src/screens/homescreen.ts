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

  // Captura a localização real ao abrir o App
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permissão Negada", "Precisamos do GPS para encontrar voluntários próximos.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocalizacao(location.coords);
    })();
  }, []);

  const dispararPedidoAjuda = async () => {
    if (!localizacao) {
      Alert.alert("Aguarde", "Obtendo sinal do GPS...");
      return;
    }

    setCarregando(true);
    try {
      const payload = {
        usuario_pcd_id: "Italo_Farias_PCD",
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        tipo_ajuda: "Auxílio Locomoção"
      };

      // Envia para o seu FastAPI (uvicorn)
      const resultado = await enviarSolicitacao(payload);
      
      // Vai para o radar passando o ID gerado pelo SQLite
      navigation.navigate('BuscaVoluntario', { solicitacaoId: resultado.id });
      
    } catch (err) {
      Alert.alert("Erro de Conexão", "Certifique-se que o servidor FastAPI está rodando em http://127.0.0.1:8000");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Conecta Ação</Text>
          <Text style={styles.subText}>
            {localizacao ? `GPS Ativo: ${localizacao.latitude.toFixed(4)}, ${localizacao.longitude.toFixed(4)}` : "Buscando satélites..."}
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
               <View style={styles.myMarker}>
                  <MaterialIcons name="accessible" size={24} color="#FFF" />
               </View>
            </Marker>
          </MapView>
        ) : (
          <View style={styles.loadingArea}>
            <ActivityIndicator size="large" color="#0047AB" />
            <Text>Localizando você...</Text>
          </View>
        )}
      </View>

      <View style={styles.actionArea}>
        <TouchableOpacity 
          style={[styles.mainButton, (!localizacao || carregando) && styles.buttonDisabled]}
          onPress={dispararPedidoAjuda}
          disabled={!localizacao || carregando}
        >
          {carregando ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            <>
              <MaterialIcons name="front-hand" size={40} color="#FFF" />
              <Text style={styles.buttonText}>PEDIR AJUDA AGORA</Text>
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
  welcomeText: { fontSize: 24, fontWeight