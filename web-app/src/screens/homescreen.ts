import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { enviarSolicitacao } from '../services/api'; // Importando o serviço que criamos

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [carregando, setCarregando] = useState(false);

  // Função que conecta o botão ao seu Backend FastAPI
  const lidarComSolicitacao = async () => {
    setCarregando(true);
    try {
      const payload = {
        usuario_pcd_id: "italo_lopes_farias", // Mock do seu ID
        latitude: -10.9472, // Localização de Aracaju
        longitude: -37.0731,
        tipo_ajuda: "Apoio Geral"
      };

      // Chamada real para o seu servidor Uvicorn
      const resultado = await enviarSolicitacao(payload);
      
      console.log("Solicitação registrada no FastAPI:", resultado.id);
      
      // Navega para a tela de radar levando o ID da solicitação
      navigation.navigate('BuscaVoluntario', { solicitacaoId: resultado.id });
      
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Erro de Conexão",
        "Não foi possível contactar o servidor do Conecta Ação. Verifique se o FastAPI está rodando."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, Italo!</Text>
          <Text style={styles.subText}>Aracaju • SE</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="account-circle" size={45} color="#0047AB" />
        </TouchableOpacity>
      </View>

      {/* MAPA */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -10.9472,
            longitude: -37.0731,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Mock de Voluntários Próximos */}
          <Marker coordinate={{ latitude: -10.948