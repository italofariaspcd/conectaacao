import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.12:8000', 
  timeout: 15000, 
});

export const enviarSolicitacao = async (dados) => {
  try {
    const response = await api.post('/solicitacoes/', dados);
    return response.data;
  } catch (error) {
    console.error("Erro API (Post):", error.message);
    throw error;
  }
};

export const obterHistorico = async () => {
  try {
    const response = await api.get('/solicitacoes/');
    return response.data;
  } catch (error) {
    console.error("Erro API (Get):", error.message);
    throw error;
  }
};

export default api;