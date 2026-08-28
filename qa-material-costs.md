# Validação — Custos de materiais

## Escopo entregue

O módulo Materiais passou a registrar um **valor unitário opcional** em cada recebimento e calcular o valor total daquele lançamento. Quando não há preço disponível, o recebimento continua válido e é identificado como custo não informado.

| Regra | Resultado esperado |
| --- | --- |
| Total do recebimento | Quantidade × valor unitário informado. |
| Custo documentado | Soma apenas dos recebimentos que possuem custo. |
| Custo médio | Total documentado ÷ quantidade com custo informado para o mesmo item, especificação e unidade. |
| Backup antigo | Recebimentos sem `unitCost` são restaurados normalmente. |

## Validação automatizada

Em 28/08/2026, a checagem TypeScript, o build estático e 31 testes passaram. Os testes de materiais cobrem custo total, média ponderada, lançamentos sem custo e a compatibilidade de restauração do backup local.

## Validação pública

No site publicado, foi lançado um recebimento de teste de 18 unidades com valor unitário de R$ 1.250,00. A interface exibiu corretamente o total de R$ 22.500,00, o total documentado, o histórico do recebimento e o custo médio de R$ 1.250,00 por unidade.
