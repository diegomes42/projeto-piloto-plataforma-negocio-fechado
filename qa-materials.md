# Validação — Recebimento de materiais

Em 28/08/2026, foi adicionada a rota **Materiais** ao núcleo operacional. Ela permite registrar data, item, especificação, quantidade, unidade, fornecedor, frente, trecho/local e uma referência opcional como nota fiscal ou romaneio.

O módulo é um controle de recebimentos, não um sistema de estoque complexo. Após o lançamento, o histórico apresenta o item e o destino, e o consolidado soma quantidades somente para combinações equivalentes de item, especificação e unidade. O exemplo de uso é compatível com o recebimento de **18 manilhas de concreto Ø 1000 mm** no trecho DRN-01.

Uma regra pura de consolidação foi coberta por teste automatizado. Após corrigir uma incompatibilidade de iteração com o alvo TypeScript, a checagem de tipos, a suíte com 11 arquivos e 23 testes e o build estático passaram.
