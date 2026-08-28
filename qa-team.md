# Validação — Gestão simples de equipe

Em 28/08/2026, foi adicionada a rota **Equipe**. O usuário pode cadastrar colaborador com nome, função e empresa/equipe, então registrar diariamente sua situação: alocado, ocioso, folga ou outro. Para a situação alocado, a frente é obrigatória.

O quadro do dia exibe onde está cada pessoa e destaca **Sem alocação** como um item que requer confirmação. Esse estado não é tratado como ociosidade automaticamente, pois a pessoa pode estar em deslocamento, em outra tarefa ou ainda sem apontamento.

A regra que produz o quadro diário foi isolada em `client/src/team.ts` e recebeu teste próprio. Após a correção de inferência do status, a checagem TypeScript, a suíte de 12 arquivos com 24 testes e o build estático passaram.
