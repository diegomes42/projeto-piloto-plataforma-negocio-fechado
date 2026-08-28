# Validação — Fluxo inicial

A prévia local foi aberta em 28/08/2026. A tela inicial apresentou o carregamento com o ícone `O`, a identidade `MÓDULO: OBRAS` e `Plataforma Negócio Fechado`, seguida pela entrada `Entrar no ambiente sincronizado`, opção de criação de conta e alternativa de continuar somente neste dispositivo.

A rota de seleção de obras apresenta o Jardim Planalto com localização Remígio/PB, situação Em execução e uma ação separada para futura adição de novas obras.

A transição foi testada na prévia local: o comando `Continuar somente neste dispositivo` levou à tela `Suas obras`, que exibiu Jardim Planalto, Remígio/PB, Em execução, o botão `Abrir obra` e o cartão de futura adição de obras.

A ação `Abrir obra` foi testada na prévia e levou corretamente à rota `#/hoje`, com o painel operacional, menu principal, localização Remígio/PB e acesso a Instalar app preservados.

## Validação pública

Após o deploy do commit `4b6a044`, a raiz pública foi conferida com cache-busting. O título exibiu `Plataforma Negócio Fechado · Módulo: Obras`; a tela mostrou o ícone `O`, a entrada `Entrar no ambiente sincronizado`, campos de e-mail e senha e a opção `Continuar somente neste dispositivo`.

## Correção da entrada

Após a correção, a raiz do aplicativo foi reaberta na prévia local em 28/08/2026. Depois do carregamento, a primeira tela exibida foi `Entrar no ambiente sincronizado`, com campos de e-mail e senha; a seleção de obras não aparece antes do login.
