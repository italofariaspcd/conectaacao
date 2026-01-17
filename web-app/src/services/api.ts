import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL do seu FastAPI
});

export const enviarSolicitacao = async (dados) => {
  try {
    const response = await api.post('/solicitacoes/', dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar solicitação:", error);
    throw error;
  }
};

export default api;