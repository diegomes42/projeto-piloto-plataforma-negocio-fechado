# Validação — Máquinas e horímetro

Em 28/08/2026, foi adicionada a rota **Máquinas**. O módulo permite cadastrar nome, tipo e identificação do equipamento, além de registrar diariamente a condição, frente, operador, horímetro inicial, horímetro final e observação.

Quando a condição é **Trabalhando**, a frente e os dois valores de horímetro são obrigatórios. O sistema rejeita horímetro final menor que o inicial e calcula automaticamente as horas utilizadas. Equipamentos sem lançamento diário aparecem como **Sem lançamento**, enquanto as condições parado e manutenção entram na contagem de atenção.

As regras de cálculo de horas e do quadro diário foram isoladas em `client/src/machines.ts` e testadas. A checagem TypeScript, a suíte de 13 arquivos com 26 testes e o build estático passaram.
