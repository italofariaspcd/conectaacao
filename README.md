# conectaacao
App de Economia Colaborativa
Conecta Ação
Transformando intenção em movimento: Conectando pessoas com deficiência a voluntários prontos para agir.

📝 Descrição do Projeto
O Conecta Ação é uma plataforma de impacto social desenhada para quebrar barreiras de acessibilidade imediata. O app funciona como uma ponte em tempo real entre PCDs (Pessoas com Deficiência) que necessitam de auxílio pontual (como auxílio em locomoção, leitura de documentos ou suporte em eventos) e Voluntários dispostos a oferecer seu tempo e habilidades.

Diferente de redes sociais passivas, o Conecta Ação foca na execução. É sobre geolocalização, prontidão e empatia aplicada.

🎯 Escopo e Objetivos
Acessibilidade em Primeiro Lugar: Interface totalmente adaptada e otimizada para tecnologias assistivas.

Conexão por Geolocalização: Encontrar ajuda ou oferecer suporte baseado na proximidade física.

Segurança e Confiança: Sistema de verificação de perfis e avaliações mútuas para garantir um ambiente seguro.

Gamificação do Bem: Estimular o voluntariado através de um sistema de recompensas simbólicas e reconhecimento comunitário.

🚀 Funcionalidades Principais (MVP)
Solicitação Instantânea: O usuário PCD descreve a necessidade em poucos cliques ou via comando de voz.

Painel de Voluntariado: Visualização de missões disponíveis em um mapa interativo.

Chat de Ação: Canal direto de comunicação para alinhar detalhes da ajuda.

Perfil de Impacto: Histórico de ações realizadas, mostrando o valor gerado para a comunidade.

🛠️ Stack Tecnológica (Sugestão)
Frontend: React Native / Flutter (Para ser multiplataforma).

Backend: Python (FastAPI ou Django).

Banco de Dados: PostgreSQL com extensão PostGIS (para geolocalização).

Infraestrutura: Arquitetura em Nuvem com foco em escalabilidade.

🎨 Identidade e Conceito
Nome: Conecta Ação (Conexão + Atitude).

Pilares: Empatia, Agilidade, Segurança e Inclusão.

Público-alvo: Pessoas com deficiência, estudantes, profissionais em busca de responsabilidade social e cidadãos engajados.

📈 Roadmap de Desenvolvimento
[ ] Definição de Requisitos e Arquitetura.

[ ] Prototipagem de UI/UX (Figma).

[ ] Desenvolvimento do MVP.

[ ] Testes de Usabilidade com usuários reais.

[ ] Lançamento Oficial.

Contribuindo: Este é um projeto de código aberto focado em acessibilidade. Sinta-se à vontade para abrir issues ou enviar pull requests.

🗺️ Fluxo de Telas: Conecta Ação1. 

Onboarding e Entrada (Comum a ambos)Tela de Splash: 
Logo animada (Conecta Ação).Boas-vindas: Breve explicação do propósito (3 slides rápidos).Login/Cadastro: Opções de login social ou e-mail.Seleção de Perfil: "Preciso de auxílio" ou "Quero ser voluntário".
Nota: O perfil pode ser alternado nas configurações depois.2. Jornada do Usuário PCD (Solicitante)O foco aqui é velocidade e comandos de voz.Home (Mapa de Presença): Mostra quantos voluntários estão ativos por perto para passar segurança.Botão "Nova Solicitação": Um botão central de destaque.Definição da Ajuda:Categorias rápidas: (Locomoção, Leitura, Apoio Digital, Outros).Campo de texto ou Botão de Áudio (essencial para acessibilidade).Confirmação de Local e Raio: Confirma o ponto no mapa.Aguardando Conexão: Tela de radar procurando voluntários.Match de Ação: Exibe foto, nome e avaliação do voluntário que aceitou.Chat/Acompanhamento: Canal direto enquanto o voluntário se desloca.Conclusão: Botão de "Ação Concluída" e avaliação.3. Jornada do Voluntário (Apoiador)O foco aqui é clareza de informações e logística.Home (Mapa de Missões): Mapa interativo com pins de solicitações abertas.Detalhes da Missão: Ao clicar no pin, vê o que é necessário e a distância.Aceitar Desafio: Botão de confirmação de compromisso.Rota de Navegação: Integração com Google Maps/Waze para chegar ao local.Chat de Apoio: Para dúvidas rápidas com o solicitante.Check-in de Chegada: Notifica que o voluntário está no local.Finalização: Envio de um feedback rápido sobre a experiência.4. Telas de Suporte e PerfilPerfil do Usuário: Bio, conquistas (gamificação) e selos de verificação.Histórico de Ações: Lista de todas as conexões feitas no passado.Configurações de Acessibilidade: Ajuste de contraste, tamanho de fonte e leitores de tela.🛠️ Tabela de Transições CríticasDeParaGatilhoHome (PCD)Radar de BuscaClicar em "Solicitar Ajuda"Radar de BuscaMatch de AçãoVoluntário clicar em "Aceitar"Mapa de MissõesDetalhesVoluntário selecionar um PinMatch de AçãoConclusãoAmbos confirmarem o fim da tarefa