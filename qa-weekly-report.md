# Validação — Relatório semanal operacional

Em 27/08/2026, foi adicionada a rota **Relatório semanal** à navegação do Projeto Piloto. O módulo consolida uma janela móvel de sete dias, definida pela data de encerramento selecionada, e apresenta diários, horas registradas, média de equipe, ocorrências, produção por frente, eventos e ações abertas com prazo no período.

O relatório permite baixar um resumo em texto e acionar a impressão do navegador, inclusive para salvar como PDF no dispositivo. A consolidação é feita exclusivamente a partir do `localStorage`, sem servidor ou serviços externos.

As regras de período e consolidação foram isoladas em `client/src/weeklyReport.ts` e validadas por dois testes Vitest. A suíte completa passou com 7 arquivos de teste e 16 testes, e o build estático concluiu com sucesso. O extrator de página não preserva a rota por hash no preview temporário, portanto a revisão visual do conteúdo da rota permanecerá para a publicação, sem bloquear a validação técnica já concluída.
