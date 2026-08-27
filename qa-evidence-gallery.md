# Validação — Galeria e classificação das evidências

Em 27/08/2026, foi adicionada a rota **Evidências**. A galeria reúne os anexos registrados pelo Diário e exibe cada item com data, frente, serviço e nome do arquivo. Quando a foto está armazenada em Base64, ela possui prévia e pode ser aberta em tamanho maior; anexos legados sem prévia mantêm seu contexto sem inventar imagem.

O usuário pode filtrar o acervo por frente, serviço ou termo de busca. A coleta e os filtros foram isolados em `client/src/evidenceGallery.ts` e cobertos por dois testes Vitest.

A checagem TypeScript, a suíte completa com 10 arquivos e 22 testes e o build estático passaram. A galeria permanece local-first, portanto fotos continuam fazendo parte do backup JSON criado anteriormente.
