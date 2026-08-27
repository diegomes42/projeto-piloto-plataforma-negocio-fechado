# Validação da ampliação do plano de ações

Em 27/08/2026, após o deploy do commit `dbe610f`, a rota pública `https://diegomes42.github.io/projeto-piloto-plataforma-negocio-fechado/?v=dbe610f#/eventos` carregou o plano do Jardim Planalto com **12 ações abertas** no navegador de QA: a ação de teste concluída anteriormente não foi contada como aberta, as nove ações originais permaneceram e três novas ações foram adicionadas.

As novas ações exibidas foram:

1. Liberar o trecho para assentamento.
2. Definir e executar o método de assentamento e içamento da tubulação.
3. Iniciar ou retomar o assentamento dos tubos.

Todas aparecem vinculadas à frente DRN-01, com prioridade Crítica e prazo “A definir” quando não havia prazo cadastrado. A migração combina as ações obrigatórias do seed com ações existentes no localStorage sem duplicar títulos já salvos.

A rota pública `#/timeline` também exibiu as três novas ações como ações abertas, junto aos diários, eventos e demais ações da drenagem. O build, a checagem TypeScript e os testes foram concluídos antes da publicação: 4 arquivos de teste e 9 testes passaram.
