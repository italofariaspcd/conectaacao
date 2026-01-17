import axios from 'axios';

/**
 * CONFIGURAÇÃO DE REDE:
 * Como você está usando o Expo Go, o app roda no seu celular.
 * Para ele "enxergar" o servidor no seu PC, usamos o seu IP local.
 */
const api = axios.create({
  baseURL: 'http://192.168.18.12:8000', 
  timeout: 5000, // 5 segundos de limite para evitar que o app trave
});

export const enviarSolicitacao = async (dados) => {
  try {
    const response = await api.post('/solicitacoes/', dados);
    return response.data;
  } catch (error) {
    // Log detalhado para te ajudar no debug via terminal
    console.error("Erro ao conectar com o FastAPI. Verifique o IP e o Firewall:", error.message);
    throw error;
  }
};

export default api;