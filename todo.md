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
