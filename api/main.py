from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import Column, String, Float, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import uuid

# Configuração do SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./conecta_acao.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelo do Banco de Dados
class Solicitacao(Base):
    __tablename__ = "solicitacoes"
    id = Column(String, primary_key=True, index=True)
    usuario_pcd_id = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    tipo_ajuda = Column(String)
    status = Column(String, default="buscando_voluntario")
    criado_em = Column(DateTime, default=datetime.now)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Conecta Ação - API")

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.post("/solicitacoes/")
def criar_solicitacao(req: dict, db: Session = Depends(get_db)):
    nova = Solicitacao(
        id=str(uuid.uuid4()),
        usuario_pcd_id=req.get('usuario_pcd_id', 'Italo Farias'),
        latitude=req.get('latitude'),
        longitude=req.get('longitude'),
        tipo_ajuda=req.get('tipo_ajuda', 'Geral')
    )
    db.add(nova); db.commit(); db.refresh(nova)
    return nova

@app.get("/solicitacoes/")
def listar_historico(db: Session = Depends(get_db)):
    return db.query(Solicitacao).order_by(Solicitacao.criado_em.desc()).all()

@app.get("/solicitacoes/{id_solicitacao}")
def checar_status(id_solicitacao: str, db: Session = Depends(get_db)):
    return db.query(Solicitacao).filter(Solicitacao.id == id_solicitacao).first()