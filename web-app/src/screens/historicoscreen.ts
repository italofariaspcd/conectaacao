import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { obterHistorico } from '../services/api';

const HistoricoScreen = () => {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const dados = await obterHistorico();
      setPedidos(dados);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconArea}>
        <MaterialIcons name="history" size={30} color="#0047AB" />
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.tipoText}>{item.tipo_ajuda}</Text>
        <Text style={styles.dataText}>{new Date(item.criado_em).toLocaleString()}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meus Chamados</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0047AB" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum pedido realizado ainda.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0047AB', padding: 20, paddingTop: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 15, padding: 15, marginBottom: 15, flexDirection: 'row', elevation: 2 },
  iconArea: { justifyContent: 'center', marginRight: 15 },
  tipoText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  dataText: { fontSize: 12, color: '#999', marginVertical: 4 },
  statusText: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default HistoricoScreen;