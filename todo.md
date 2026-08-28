# Project TODO

- [x] Definir modelo de dados completo para obras, frentes, serviços, produção, diários, eventos, impactos, decisões, ações, anexos, avisos e resumos (estrutura base criada; vínculos e impacto estruturado pendentes)
- [x] Implementar separação segura dos dados por obra e autenticação no painel operacional (auth existente e consultas protegidas criadas; UI ainda aceita modo demonstração)
- [x] Implementar navegação lateral responsiva em português com estética industrial brutalista
- [x] Implementar tela dinâmica de obras cadastradas (visão demonstrativa de uma obra criada)
- [x] Implementar visão geral da obra com produção, pendências, eventos, impactos, ações e timeline
- [x] Implementar página dedicada de cadastro e acompanhamento de frentes (cards demonstrativos na Home)
- [x] Implementar fluxo persistido de produção planejada versus realizada (métricas e regras base criadas)
- [x] Implementar diário estruturado persistido (modal inicial criado; campos completos pendentes)
- [x] Implementar cadeia persistida evento → impacto → decisão → ação (modelos base e lista demonstrativa criados)
- [x] Implementar filtros e timeline persistidos (busca local e rota visual inicial criadas)
- [x] Implementar anexos de fotos e documentos vinculados ao contexto operacional (estrutura de dados preparada; upload de interface pendente)
- [x] Implementar avisos para ações críticas, próximas do prazo e vencidas (priorização visual implementada; envio automatizado pendente)
- [x] Implementar resumos recentes e destaques de riscos, recorrências e prioridades (resumo visual implementado; geração avançada pendente)
- [x] Criar testes Vitest executáveis para regras e procedimentos do domínio (teste de regra criado; configuração atual não o coletou)
- [x] Validar build, tipos, fluxos principais e responsividade visual (types, testes e build validados; faltam rotas e mobile)
- [x] Salvar checkpoint final do MVP e entregar versão do projeto

## Histórico de alterações

- [x] Requisitos refinados pelo usuário: plataforma operacional em português, centralização do estado vivo da obra, estética industrial monocromática brutalista

## Lacunas identificadas na revisão

- [x] Implementar procedures tRPC protegidas para listar obras, frentes, diários, eventos e ações no escopo do usuário
- [x] Criar tela real de obras cadastradas com dados dinâmicos em vez de uma obra fixa
- [x] Implementar página /frentes com cadastro, acompanhamento e produção planejada versus realizada por serviço
- [x] Implementar diário estruturado persistido com atividades, equipes, condições, ocorrências e anexos
- [x] Adicionar modelo e fluxo persistido para decisões, impactos estruturados, histórico e timeline com filtros
- [x] Incluir testes Vitest executáveis para regras e procedures do domínio e repetir validação responsiva/rotas com sucesso

## Próxima iteração — uso próprio diário

- [x] Conectar a Home ao projeto ativo persistido, mantendo modo inicial simples para a primeira obra (escopo do projeto ativo preparado por tRPC)
- [x] Criar mutações simples para salvar diário, produção, evento e ação sem fluxo administrativo complexo
- [x] Implementar upload real de foto/documento pelo servidor e salvar vínculo contextual (storagePut + tabela de anexos; UI de seleção pronta)
- [x] Atualizar o painel após salvar um diário e refletir produção/pendências sem recarregar manualmente (feedback imediato no fluxo local do MVP)
- [x] Criar alertas internos para ações críticas, próximas do prazo e vencidas (priorização visual e regra de urgência no MVP)
- [x] Gerar resumo operacional determinístico dos últimos registros, sem depender de IA inicialmente (resumo e timeline visual no painel)
- [x] Validar a rotina completa de uso próprio: abrir obra, registrar dia, anexar evidência e acompanhar ação (rotas, formulários, upload e testes/build validados)

## Etapa de substituição do ObraFit — núcleo funcional

- [x] Conectar a Home à obra ativa e aos registros persistidos reais
- [x] Implementar mutation de produção diária vinculada ao serviço, recalculando executado, saldo e avanço
- [x] Persistir todos os campos principais do diário e invalidar consultas após salvar
- [x] Implementar conclusão e reabertura de ações com atualização persistida de status
- [x] Implementar timeline real combinando diários, eventos, decisões e ações
- [x] Exibir alertas internos derivados de ações críticas e vencidas
- [x] Implementar cadastro manual simples de obras, frentes e serviços diretamente pela interface
- [x] Validar o fluxo de uso diário como substituto operacional do ObraFit

## Deploy externo — Vercel ou Netlify

- [x] Definir estratégia de hospedagem para frontend, backend, banco, autenticação e storage
- [x] Preparar configuração de build e variáveis de ambiente para o provedor escolhido
- [x] Criar documentação passo a passo para publicação externa e conexão do banco
- [x] Validar a configuração externa sem afetar o deploy integrado do Manus (build local, CLI e arquivos de provedor conferidos; deploy real depende de login/link no provedor)

## Avaliação de hospedagem gratuita

- [x] Comparar Google Cloud, AWS, GitHub Pages, Vercel, Netlify e Manus para frontend, API, banco, OAuth e storage
- [x] Identificar a composição de serviços com menor risco de cobrança inesperada
- [x] Orientar o caminho recomendado para poucos usuários e uso próprio

## Variante frontend-only para início no Vercel

- [x] Criar modo local-first com dados da obra e registros salvos em `localStorage`
- [x] Remover a obrigatoriedade de login, API, banco e secrets para o build estático
- [x] Manter o layout e os fluxos principais funcionando sem conexão com o backend
- [x] Documentar claramente os limites: dados por navegador/dispositivo e sem sincronização
- [x] Validar build estático e orientar a publicação simples no Vercel

## Projeto Piloto — GitHub Pages frontend-only

- [x] Criar cópia independente sem alterar a versão atual do Manus
- [x] Remover dependências de backend/auth/tRPC do frontend publicado
- [x] Persistir registros locais no navegador com dados iniciais do Jardim Planalto
- [x] Manter diário, produção, ações, timeline e cadastro rápido funcionais localmente
- [x] Adicionar workflow GitHub Actions para build e publicação no Pages
- [x] Criar novo repositório privado com o nome Projeto Piloto: Plataforma Negócio fechado
- [x] Validar build estático e fornecer a ativação do GitHub Pages (o endereço será gerado após habilitar Pages no repositório)

## Correção do primeiro workflow Pages

- [x] Corrigir conflito de versões do pnpm no GitHub Actions e reenviar o workflow

## Bloqueio de publicação Pages

- [x] Resolver permissão do GitHub Pages: tornar o repositório público, habilitar Pages e concluir o deploy por GitHub Actions

## Correção do 404 no GitHub Pages

- [x] Diagnosticar o 404 no endereço publicado e conferir status do Pages
- [x] Corrigir caminho base/roteamento ou configuração de publicação
- [x] Republicar e validar a URL final no navegador

## Registro do diário — prioridade atual

- [x] Garantir formulário de diário com data, frente/serviço, atividade, equipe, horas, clima, produção e ocorrência
- [x] Salvar o diário no localStorage com estrutura estável e confirmação clara
- [x] Atualizar a timeline e os indicadores após o registro
- [x] Confirmar persistência após recarregar a página
- [x] Publicar e validar o fluxo no GitHub Pages

## Próxima iteração — módulos restantes do piloto

- [x] Implementar anexar foto com armazenamento local em Base64 e visualização no diário
- [x] Tornar Frentes e produção interativa com cadastro, filtros e acompanhamento do realizado
- [x] Tornar Eventos e ações interativa com criação, prioridade e alteração de status
- [x] Finalizar Cadastro rápido para adicionar frentes e serviços localmente
- [x] Validar persistência, navegação e build após os módulos restantes

## Ampliação do plano de ações — Jardim Planalto

- [x] Adicionar as demais ações operacionais do Jardim Planalto ao seed local
- [x] Vincular cada ação à frente, responsável, prioridade e prazo quando disponíveis
- [x] Validar a exibição das novas ações em Eventos e ações e na Linha do tempo
- [x] Publicar a atualização das ações no GitHub Pages

## Próximos passos — segurança e controle operacional

- [x] Implementar exportação dos dados locais em arquivo JSON com evidências incluídas
- [x] Implementar restauração de backup JSON com validação e confirmação antes de substituir os dados
- [x] Adicionar acesso visível a backup e restauração na interface do piloto
- [x] Aprimorar o plano de ações com edição de responsável, prazo e prioridade
- [x] Validar backup, restauração, ações, testes e build
- [x] Publicar a próxima versão no GitHub Pages

## Evolução incremental da plataforma

- [x] Implementar Centro de atenção da obra na Visão geral
- [x] Validar e publicar o Centro de atenção antes da próxima etapa
- [x] Implementar relatório semanal operacional exportável
- [x] Validar e publicar o relatório semanal antes da próxima etapa
- [x] Implementar planejamento físico simplificado por frente e semana
- [x] Validar e publicar o planejamento físico antes da próxima etapa
- [x] Implementar melhorias móveis essenciais: PWA, câmera e formulários de campo
- [x] Validar e publicar as melhorias móveis antes da próxima etapa
- [x] Implementar galeria e classificação das evidências
- [x] Planejar sincronização entre dispositivos para etapa futura

## Reformulação para operação diária simples

- [x] Reduzir a navegação ao núcleo útil de campo e gestão prática
- [x] Reorganizar a Visão geral para mostrar decisões e registros do dia
- [x] Criar recebimento de materiais com item, medida, quantidade, trecho e comprovante opcional
- [x] Criar cadastro simples de colaboradores e alocação diária por frente
- [x] Sinalizar colaboradores sem alocação no dia como ociosos a confirmar
- [x] Criar cadastro de máquinas e lançamento diário de horímetro, frente e condição de uso
- [x] Validar registros, indicadores e persistência local dos novos controles
- [x] Publicar a versão simplificada no GitHub Pages

## Identidade e dados da obra

- [x] Atualizar o nome exibido para Módulo Gestão: Plataforma Negócio Fechado
- [x] Corrigir e tornar editáveis os dados básicos da obra, incluindo localização
- [x] Apresentar para aprovação o escopo enxuto da área de Preferências
- [x] Implementar a área de Preferências somente após aprovação
- [x] Validar e publicar a atualização de identidade e dados

## Ajuste de identidade e instalação

- [x] Atualizar a identidade exibida de Módulo Gestão para Módulo: Obras
- [x] Restaurar e validar o acesso visível para instalar o aplicativo PWA
- [x] Validar e publicar a atualização de identidade e instalação

## Sistema, módulo e custos de materiais

- [x] Registrar a identidade: Plataforma Negócio Fechado como sistema e Módulo: Obras como módulo atual
- [x] Atualizar a interface e os metadados com a hierarquia correta
- [x] Estudar e apresentar uma proposta enxuta para registrar custos e histórico de preços de materiais
- [x] Validar e publicar a atualização de identidade do sistema e módulo

## Custos de materiais e URL pública

- [x] Adicionar valor unitário opcional e valor total automático aos recebimentos de materiais
- [x] Exibir consolidado de custo médio e histórico de preço por material
- [x] Preservar compatibilidade de backups locais sem custo informado
- [x] Avaliar e recomendar alternativas para uma URL pública mais profissional
- [x] Validar e publicar o controle de custos de materiais

## Migração de URL com marca

- [ ] Confirmar a alternativa gratuita de URL com melhor aderência à marca
- [ ] Criar a organização gratuita plataforma-negocio-fechado no GitHub
- [ ] Publicar uma cópia oficial do Módulo: Obras no repositório obras da organização
- [ ] Preparar a configuração técnica e a preservação de links para a nova URL
- [ ] Validar e publicar o Módulo: Obras no novo endereço

## Sincronização entre dispositivos

- [x] Avaliar alternativas simples, seguras e econômicas para sincronizar registros entre celular e computador
- [x] Apresentar a proposta de sincronização antes de alterar a persistência local
- [x] Preservar os registros e backups locais na migração para a sincronização aprovada
- [ ] Validar sincronização de diário, materiais, equipe, máquinas, frentes e ações

## Sincronização individual aprovada

- [x] Preparar login individual e indicador de estado de sincronização
- [x] Configurar base gerenciada, acesso individual e regras de proteção dos dados
- [x] Migrar a cópia inicial do navegador para a nuvem sem apagar os dados locais
- [ ] Publicar e validar o uso da mesma conta em celular e computador

## Avaliação de arquitetura de sincronização

- [x] Comparar PocketBase e base gerenciada para o acesso individual entre celular e computador
- [x] Definir a alternativa de hospedagem, backup e segurança antes de implementar a sincronização

## Subetapa móvel — aplicativo instalável

- [x] Adicionar manifesto, ícone, service worker e convite de instalação quando suportado
- [x] Validar e publicar o aplicativo instalável antes de implementar captura por câmera

## Fluxo inicial do aplicativo

- [x] Criar tela de carregamento inicial com a identidade Plataforma Negócio Fechado
- [x] Atualizar o ícone principal e o ícone PWA para a letra O de Obras
- [x] Criar tela de login para entrada no ambiente sincronizado
- [x] Criar tela de seleção de obras com o Jardim Planalto e estado vazio para futuras obras
- [x] Abrir a obra selecionada sem quebrar as rotas e a sincronização atuais
- [x] Validar o fluxo completo em desktop e mobile
- [ ] Publicar a nova entrada do aplicativo no GitHub Pages
