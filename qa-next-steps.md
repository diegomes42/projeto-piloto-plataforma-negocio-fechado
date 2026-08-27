# Validação dos próximos passos do Projeto Piloto

Em 27/08/2026, a rota local `http://127.0.0.1:4173/#/dados` carregou o novo menu **Backup dos dados**, o resumo da obra e os botões de exportação e restauração. A página exibiu contadores de diários, evidências, eventos e ações e explicou que o arquivo não é enviado a servidor.

A seleção controlada de um arquivo `qa-backup.json` válido abriu o diálogo **Restaurar este backup?**, identificando o arquivo e informando que os dados atuais do navegador serão substituídos. O cancelamento fechou o diálogo sem substituir o estado local de QA.

Na rota local `#/eventos`, a primeira ação exibiu o novo controle de edição. Ao acioná-lo, apareceram os campos de responsável, prazo e prioridade, além dos botões Salvar e Cancelar. A edição foi salva com responsável “Equipe de drenagem”, prazo 30/08/2026 e prioridade Alta; a interface exibiu “Ação atualizada neste navegador” e refletiu os três valores no cartão da ação.

Na tela local de backup, o botão **Baixar backup JSON** foi acionado com sucesso e exibiu o feedback “Backup baixado”.
