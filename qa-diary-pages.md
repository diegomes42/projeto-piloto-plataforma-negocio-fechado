# Validação do diário no GitHub Pages

Em 27/08/2026, a URL pública com cache-busting `https://diegomes42.github.io/projeto-piloto-plataforma-negocio-fechado/?v=a9019f2#/diario` carregou sem 404. O formulário exibiu data, seleção de frente, serviço executado, atividade principal, clima, equipe, horas, produção, ocorrência, anexo e botão Salvar diário. O site usa hash routing e os dados devem ser gravados em localStorage no navegador.

## Teste executado

Foi selecionada a frente DRN-01 e preenchido um diário de teste em 27/08/2026 com serviço de escavação e assentamento, atividade, clima, 6 pessoas, 8 horas, produção de 12,5 m e ocorrência de campo. Ao clicar em Salvar diário, a interface exibiu o aviso “Diário salvo neste navegador”, limpou atividade/serviço/produção e exibiu o registro completo na lista, confirmando a persistência durante a sessão.
