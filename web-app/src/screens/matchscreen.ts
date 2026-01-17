import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MatchScreen = ({ route, navigation }) => {
  // Recebemos os dados do voluntário vindos da BuscaScreen via parâmetros de rota
  const { voluntario } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Ícone de Sucesso */}
        <View style={styles.successBadge}>
          <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
          <Text style={styles.matchTitle}>Voluntário Encontrado!</Text>
        </View>

        {/* Card do Voluntário */}
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="account-circle" size={100} color="#CCC" />
          </View>
          
          <Text style={styles.name}>{voluntario?.nome || "João Silva"}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.infoText}>{voluntario?.avaliacao || "4.9"}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="location-on" size={20} color="#0047AB" />
              <Text style={styles.infoText}>{voluntario?.distancia || "500m"}</Text>
            </View>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => alert("Abrindo Chat...")}
          >
            <MaterialIcons name="chat" size={24} color="#FFF" />
            <Text style={styles.buttonText}>ABRIR CHAT</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => alert("A ligar para o voluntário...")}
          >
            <MaterialIcons name="phone" size={24} color="#0047AB" />
            <Text style={[styles.buttonText, { color: '#0047AB' }]}>LIGAR</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backText}>VOLTAR PARA A HOME</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  successBadge: { alignItems: 'center', marginBottom: 30 },
  matchTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 10 },
  card: {
    backgroundColor: '#FFF',
    width: width * 0.9,
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  avatarContainer: { marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#0047AB' },
  infoRow: { flexDirection: 'row', marginTop: 15, width: '100%', justifyContent: 'space-around' },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  infoText: { marginLeft: 5, fontSize: 16, color: '#666', fontWeight: '600' },
  buttonContainer: { marginTop: 40, width: '100%', alignItems: 'center' },
  chatButton: {
    backgroundColor: '#0047AB',
    flexDirection: 'row',
    width: width * 0.8,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  callButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#0047AB',
    flexDirection: 'row',
    width: width * 0.8,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  backButton: { marginTop: 30 },
  backText: { color: '#999', fontWeight: '600' }
});

export default MatchScreen;