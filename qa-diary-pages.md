# Validação do Projeto Piloto no GitHub Pages

Em 27/08/2026, a URL pública com cache-busting `https://diegomes42.github.io/projeto-piloto-plataforma-negocio-fechado/?v=a9019f2#/diario` carregou sem 404. O site usa hash routing e os registros ficam no localStorage do navegador.

## Diário

Foi selecionada a frente DRN-01 e preenchido um diário de teste em 27/08/2026 com serviço de escavação e assentamento, atividade, clima, 6 pessoas, 8 horas, produção de 12,5 m e ocorrência de campo. Ao clicar em Salvar diário, a interface exibiu “Diário salvo neste navegador”, limpou atividade/serviço/produção e exibiu o registro completo na lista. O recarregamento da rota manteve o registro visível.

## Frentes e produção

A rota `#/frentes` carregou com 1 frente ativa, produção acumulada 322,50 e 1 registro de produção; a frente DRN-01 apareceu com 75% e 322,5/430 m. Após o deploy final, a migração passou a repor os serviços iniciais do seed para os dados antigos: Escavação, Assentamento de tubulação, Reaterro e Bombeamento aparecem em DRN-01, além dos serviços das demais frentes. Foi adicionado o serviço “Inspeção de fundo” à frente DRN-01; a interface exibiu “Serviço adicionado à frente” e mostrou o novo chip.

## Eventos e ações

A rota `#/eventos` exibiu os formulários de novo evento e nova ação, o evento inicial de solo saturado, os estados Aberto/Em tratamento/Resolvido e as ações críticas. Foi criado com sucesso o evento “Atraso na mobilização da bomba”, com descrição, impacto, decisão, prioridade Alta e vínculo com DRN-01; a interface exibiu “Evento registrado localmente”. Em seguida, foi criada a ação “Conferir chegada do sistema de bombeamento”, com responsável Equipe Remígio, prazo 29/08/2026, prioridade Alta, vínculo com DRN-01 e vínculo ao novo evento; a interface exibiu “Ação adicionada ao plano” e passou a mostrar 10 ações abertas. O clique nessa ação marcou-a como concluída, exibiu “Ação concluída” e reduziu o contador para 9 abertas.

## Cadastro rápido

A rota `#/cadastro` exibiu os campos de nome, código, unidade, planejado, primeiro serviço e dependência. Foi criada com sucesso uma frente de QA contendo código QA-01, unidade m, planejado 250 e serviço inicial “Teste de serviço”; a interface exibiu “Frente cadastrada localmente” e adicionou a frente à lista.

## Timeline

A rota `#/timeline` exibiu no mesmo histórico a ação concluída, os dois eventos e o diário registrado, além das ações abertas sem prazo. O filtro “bombeamento” reduziu a lista para os três registros relacionados ao termo, confirmando a busca textual.

## Evidência

Após o deploy final, a rota `#/diario` manteve o diário anterior e exibiu as frentes atuais, incluindo QA-01. A inspeção confirmou um input de arquivo com `accept="image/*"`. A seleção controlada do arquivo `evidencia-qa.svg` foi reconhecida, o formulário mostrou o nome do arquivo, o controle “Remover” e a mensagem de compactação. O diário foi salvo com essa evidência; a interface exibiu “Diário salvo neste navegador”, limpou o formulário e mostrou o novo registro “Inspeção de fundo” com o link “Ver foto”. O HTML confirmou a existência de um `data:image/jpeg;base64,...` no link, validando a compactação e a persistência local da imagem.
