from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime
import uuid

app = FastAPI(
    title="Conecta Ação API",
    description="Backend para conexão entre PCDs e Voluntários"
)

# --- MODELOS DE DADOS ---

class SolicitacaoRequest(BaseModel):
    usuario_pcd_id: str
    latitude: float
    longitude: float
    tipo_ajuda: str

class SolicitacaoStatus(BaseModel):
    id: str
    status: str
    voluntario_atribuido: Optional[Dict] = None

# --- "BANCO DE DADOS" TEMPORÁRIO ---
# Em um projeto de larga escala, aqui entraríamos com PostgreSQL + PostGIS
solicitacoes_db = {}

# --- ENDPOINTS ---

@app.get("/")
async def home():
    return {
        "projeto": "Conecta Ação",
        "status": "Online",
        "endpoints_uteis": ["/docs", "/solicitacoes"]
    }

@app.post("/solicitacoes/", response_model=SolicitacaoStatus)
async def criar_solicitacao(req: SolicitacaoRequest):
    """
    Cria uma nova solicitação de ajuda e inicia o radar.
    """
    id_solicitacao = str(uuid.uuid4())
    nova_solicitacao = {
        "id": id_solicitacao,
        "usuario_pcd_id": req.usuario_pcd_id,
        "status": "buscando_voluntario",
        "voluntario_atribuido": None,
        "criado_em": datetime.now()
    }
    solicitacoes_db[id_solicitacao] = nova_solicitacao
    return nova_solicitacao

@app.get("/solicitacoes/{id_solicitacao}", response_model=SolicitacaoStatus)
async def checar_status(id_solicitacao: str):
    """
    O App Mobile consulta este endpoint via Polling para detectar mudanças.
    """
    if id_solicitacao not in solicitacoes_db:
        raise HTTPException(status_code=404, detail="Solicitação expirada ou inexistente")
    return solicitacoes_db[id_solicitacao]

# --- ROTA DE SIMULAÇÃO (PARA TESTES) ---

@app.post("/simular-aceite/{id_solicitacao}")
async def simular_aceite(id_solicitacao: str):
    """
    Simula que um voluntário em Aracaju aceitou o chamado.
    Use este endpoint pelo Swagger (/docs) para testar o App.
    """
    if id_solicitacao not in solicitacoes_db:
        raise HTTPException(status_code=404, detail="ID Inválido")
    
    # Atualiza o status para disparar o gatilho no Mobile
    solicitacoes_db[id_solicitacao]["status"] = "atendido"
    solicitacoes_db[id_solicitacao]["voluntario_atribuido"] = {
        "nome": "João Silva",
        "avaliacao": 4.9,
        "distancia": "500m",
        "telefone": "79 99999-9999"
    }
    
    return {"message": "Sucesso! O App deve navegar para a tela de Match agora."}