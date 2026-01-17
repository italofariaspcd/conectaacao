from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(title="Conecta Ação API")

# --- SCHEMAS (Modelos de Dados) ---

class SolicitacaoRequest(BaseModel):
    usuario_pcd_id: str
    latitude: float
    longitude: float
    tipo_ajuda: str  # Ex: "Locomoção", "Leitura", "Apoio Geral"

class SolicitacaoResponse(BaseModel):
    id: str
    status: str
    criado_em: datetime

# --- BANCO DE DADOS VOLÁTIL (Para testes do MVP) ---
# Em produção, usaríamos PostgreSQL + PostGIS
solicitacoes_db = {}

# --- ENDPOINTS ---

@app.get("/")
async def root():
    return {"status": "Conecta Ação API v1.0 está ativa"}

@app.post("/solicitacoes/", response_model=SolicitacaoResponse)
async def criar_solicitacao(req: SolicitacaoRequest):
    """
    Recebe um pedido de ajuda do App Mobile e inicia o processo de busca.
    """
    id_solicitacao = str(uuid.uuid4())
    nova_solicitacao = {
        "id": id_solicitacao,
        "usuario_pcd_id": req.usuario_pcd_id,
        "lat": req.latitude,
        "lon": req.longitude,
        "status": "buscando_voluntario",
        "criado_em": datetime.now()
    }
    
    # Salva no "banco" temporário
    solicitacoes_db[id_solicitacao] = nova_solicitacao
    
    print(f"LOG: Nova ajuda solicitada em Aracaju: {req.tipo_ajuda} na posição {req.latitude}, {req.longitude}")
    
    return nova_solicitacao

@app.get("/solicitacoes/{id_solicitacao}")
async def checar_status(id_solicitacao: str):
    """
    O App Mobile vai consultar este endpoint (polling) 
    para saber se um voluntário já aceitou.
    """
    solicitacao = solicitacoes_db.get(id_solicitacao)
    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação não encontrada")
    
    return {
        "id": id_solicitacao,
        "status": solicitacao["status"],
        "voluntario_atribuido": None # Futura lógica de match
    }