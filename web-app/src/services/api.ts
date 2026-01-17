import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.12:8000', // Seu IP de Capela/SE
  timeout: 15000,
});

export const enviarSolicitacao = async (dados) => {
  const response = await api.post('/solicitacoes/', dados);
  return response.data;
};

export const obterHistorico = async () => {
  const response = await api.get('/solicitacoes/');
  return response.data;
};

export default api;