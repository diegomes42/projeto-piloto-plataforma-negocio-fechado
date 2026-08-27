# Validação — Planejamento físico simplificado

Em 27/08/2026, foi adicionada a rota **Planejamento físico**. Ela permite definir uma meta por frente e por semana, registrar uma observação de planejamento e atualizar a mesma meta ao repetir a combinação de frente e encerramento da semana.

O realizado é calculado exclusivamente a partir dos diários registrados no período de sete dias correspondente. Cada meta apresenta planejado, realizado, variação, percentual e status: **Meta atingida**, **Em andamento** ou **Atrasada**. Não há metas pré-preenchidas, evitando criar compromissos fictícios para a obra.

As regras de comparação semanal foram isoladas em `client/src/physicalPlanning.ts` e cobertas por dois testes. Após a correção de tipagem do status, a suíte completa passou com 8 arquivos de teste e 18 testes. A checagem TypeScript e o build estático também concluíram com sucesso.
