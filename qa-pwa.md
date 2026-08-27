# Validação — Aplicativo instalável

Em 27/08/2026, o Projeto Piloto recebeu um manifesto web, ícone próprio e service worker. O registro do service worker usa o `BASE_URL` do Vite, preservando o escopo do subdiretório no GitHub Pages.

Foi incluído um botão **Instalar app** na Visão geral, exibido apenas quando o navegador disponibiliza o prompt de instalação. O cache inicial preserva a estrutura do aplicativo para acesso básico à tela já carregada em condições de conexão instável, sem criar sincronização automática de dados.

A checagem TypeScript, a suíte com 9 arquivos de teste e 20 testes, e o build estático passaram. Os três artefatos necessários — manifesto, service worker e ícone — foram confirmados no diretório de build.
