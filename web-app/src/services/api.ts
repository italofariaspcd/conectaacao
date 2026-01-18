import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.12:8000', 
  timeout: 10000,
});

export const enviarSolicitacao = async (dados) => {
  const response = await api.post('/solicitacoes/', dados);
  return response.data;
};

export default api;