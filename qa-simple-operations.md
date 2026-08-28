# Validação — Operação diária simplificada

Em 28/08/2026, a plataforma foi reformulada para privilegiar registros de campo e uma gestão prática. A navegação principal reúne Hoje, Diário do dia, Materiais, Equipe, Máquinas, Frentes, Ações e Backup. Recursos avançados já implementados permanecem preservados, mas foram retirados do menu principal para reduzir complexidade.

O controle de materiais registra recebimentos por item, especificação, quantidade, unidade, fornecedor e trecho. A equipe permite cadastrar pessoas e definir a situação diária, sinalizando casos sem alocação para confirmação. Máquinas permitem registrar condição, frente, operador e horímetro, calculando as horas do dia e chamando atenção para equipamentos parados ou sem lançamento.

Depois da integração dos atalhos da Visão geral, a checagem TypeScript, a suíte com 13 arquivos e 26 testes e o build estático passaram. O deploy individual de Materiais, Equipe e Máquinas também foi concluído com sucesso no GitHub Pages antes desta publicação de integração.
