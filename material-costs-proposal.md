# Proposta — Custos de materiais

## Objetivo

Transformar cada recebimento já registrado no **Módulo: Obras** em uma base confiável de custo de material, sem introduzir contas a pagar, orçamento completo ou rotinas de ERP nesta primeira etapa.

> **Regra de escopo:** o registro financeiro inicial acompanha o material recebido. Ele não representa, ainda, o pagamento ao fornecedor.

## Situação atual

Cada recebimento local já guarda a data, material, especificação, quantidade, unidade, fornecedor, frente, local de destino e referência de NF ou romaneio. Essa estrutura é suficiente para relacionar um custo ao item e consolidá-lo ao longo do tempo.

| Informação já disponível | Uso no controle de custo |
| --- | --- |
| Material e especificação | Identificar o item e separar preços de variações técnicas diferentes. |
| Quantidade e unidade | Calcular valor total e custo unitário. |
| Fornecedor | Comparar histórico de preço por fornecedor. |
| Data e referência | Manter rastreabilidade por entrega, NF ou romaneio. |
| Frente e local | Apurar quanto foi destinado a cada frente. |

## Primeira entrega recomendada

Acrescentar somente dois campos opcionais ao formulário de **Materiais** e três leituras automáticas na própria tela.

| Elemento | Como funcionará | Por que é suficiente agora |
| --- | --- | --- |
| Valor unitário (R$) | Preenchido quando o preço estiver disponível. | É o dado essencial para formar histórico de custo por item. |
| Valor total (R$) | Calculado automaticamente: quantidade × valor unitário. | Evita divergência entre valores digitados e deixa o lançamento rápido. |
| Total recebido com custo informado | Soma dos valores totais registrados. | Mostra a despesa documentada no período, sem chamar de pagamento. |
| Custo médio por item | Soma dos valores ÷ soma das quantidades do mesmo item, especificação e unidade. | Permite enxergar variações reais de preço. |
| Histórico de preços | Lista de recebimentos com data, fornecedor, quantidade e valor unitário. | Forma o banco de dados inicial para futuras cotações e decisões de compra. |

Por exemplo, no recebimento de **18 manilhas Ø 1000 mm**, o lançamento poderia registrar `R$ 1.250,00` como valor unitário. O sistema exibiria `R$ 22.500,00` como total daquele recebimento e incorporaria o valor ao histórico das manilhas Ø 1000 mm.

## Dados que não entram nesta etapa

Para preservar a simplicidade, a primeira entrega não incluirá centro de custo, orçamento versus realizado, vencimentos, parcelas, pagamentos, impostos, retenções, rateio de frete, estoque, aprovação de compra ou integração bancária. Esses controles dependem de uma separação entre compra, entrega e pagamento que não é necessária para o uso de campo inicial.

## Caminho de evolução preservado

Se o uso confirmar que o controle de custos é útil, uma etapa futura pode introduzir registros separados de **compra/fatura** e **pagamento**, relacionados aos materiais já recebidos. Assim, uma única NF poderá cobrir vários materiais e pagamentos parciais, sem alterar os recebimentos que já formaram o histórico de preço.

## Decisão solicitada

Se aprovado, a próxima entrega implementará somente o **valor unitário opcional**, o **total automático**, o **consolidado de custo por material** e o **histórico de preços por recebimento**, todos mantidos no mesmo backup local existente.
