from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import Column, String, Float, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import uuid

# 1. Configuração do SQLite (Gera o arquivo conecta_acao.db automaticamente)
SQLALCHEMY_DATABASE_URL = "sqlite:///./conecta_acao.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. Modelo da Tabela no Banco de Dados
class SolicitacaoModel(Base):
    __tablename__ = "solicitacoes"
    id = Column(String, primary_key=True, index=True)
    usuario_pcd_id = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    tipo_ajuda = Column(String)
    status = Column(String, default="buscando_voluntario")
    criado_em = Column(DateTime, default=datetime.now)

# 3. Cria a tabela fisicamente
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Conecta Ação API")

# 4. Função para gerenciar a conexão por requisição
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ENDPOINTS ---

@app.get("/")
def read_root():
    return {"message": "API Conecta Ação Rodando com SQLite!"}

@app.post("/solicitacoes/")
def criar_solicitacao(req: dict, db: Session = Depends(get_db)):
    nova_ajuda = SolicitacaoModel(
        id=str(uuid.uuid4()),
        usuario_pcd_id=req.get('usuario_pcd_id', 'anonimo'),
        latitude=req.get('latitude'),
        longitude=req.get('longitude'),
        tipo_ajuda=req.get('tipo_ajuda', 'Geral')
    )
    db.add(nova_ajuda)
    db.commit()
    db.refresh(nova_ajuda)
    return nova_ajuda

@app.get("/solicitacoes/{id_solicitacao}")
def checar_status(id_solicitacao: str, db: Session = Depends(get_db)):
    item = db.query(SolicitacaoModel).filter(SolicitacaoModel.id == id_solicitacao).first()
    if not item:
        raise HTTPException(status_code=404, detail="Solicitação não encontrada")
    return item