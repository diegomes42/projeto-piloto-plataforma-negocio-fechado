# Validação — Identidade e Preferências

Em 28/08/2026, a identidade do aplicativo foi atualizada para **Módulo Gestão: Plataforma Negócio Fechado** no título do navegador, no manifesto do aplicativo instalável e na navegação principal.

A localização inicial do Jardim Planalto foi corrigida para **Remígio/PB**. A normalização dos dados aplica essa correção a instalações locais legadas que ainda apresentavam Jardim Planalto em São Paulo, sem alterar registros operacionais.

O botão **Preferências** passou a abrir uma tela com edição de nome da obra, cidade/UF, situação e descrição curta. Os dados são salvos no navegador e atualizam a identificação mostrada no menu lateral. A checagem TypeScript, a suíte de 13 arquivos com 27 testes e o build estático passaram.
