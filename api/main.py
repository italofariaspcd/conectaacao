from fastapi import FastAPI
from typing import List

app = FastAPI(title="Conecta Ação API")

@app.get("/")
def read_root():
    return {"message": "Conecta Ação Online"}

@app.post("/solicitar-ajuda/")
async def criar_solicitacao(solicitacao: SolicidacaoAjuda):
    # Aqui entraria a lógica de disparar push notification 
    # para voluntários em um raio de X km
    return {"status": "Busca iniciada", "id": solicitacao.id}

@app.get("/voluntarios-proximos/")
async def listar_voluntarios(lat: float, lon: float):
    # Exemplo de lógica de Data Engineer:
    # Query SQL: SELECT id FROM voluntários 
    # WHERE ST_DWithin(geom, ST_MakePoint(lo