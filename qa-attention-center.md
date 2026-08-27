# Validação — Centro de atenção da obra

Em 27/08/2026, foi implementado na Visão geral um Centro de atenção derivado dos dados locais da obra. O painel identifica ações vencidas, prazos previstos para os próximos sete dias, eventos críticos ainda não resolvidos e frentes em andamento sem diário atualizado nos últimos sete dias. Cada item direciona para o módulo operacional correspondente.

As regras foram isoladas em `client/src/operationalInsights.ts` e exercitadas por dois testes Vitest. A suíte completa passou com 6 arquivos de teste e 14 testes. A checagem TypeScript e o build estático também passaram. O preview local respondeu com HTTP 200 após uma reinicialização; a inspeção visual automatizada não foi concluída porque a sessão do navegador ficou indisponível durante a tentativa.
