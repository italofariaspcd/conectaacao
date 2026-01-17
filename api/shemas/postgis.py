# Exemplo de Schema Pydantic para uma Solicitação de Ajuda
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SolicidacaoAjuda(BaseModel):
    id: str
    usuario_pcd_id: str
    tipo_ajuda: str  # Locomoção, Leitura, etc.
    latitude: float
    longitude: float
    status: str      # 'aberta', 'em_caminho', 'concluida'
    criado_em: datetime = datetime.now()