# Validação — Sincronização individual

## Infraestrutura

A base gratuita `modulo-obras` foi criada na organização Yezira, na região `sa-east-1`. A tabela `project_snapshots` foi aplicada com uma linha por usuário, referência a `auth.users`, chave primária por usuário e Row Level Security habilitado. As políticas permitem somente que o usuário autenticado leia e altere o próprio snapshot.

## Aplicativo

O Módulo: Obras mantém a gravação local e agora oferece, em Preferências, login individual, criação de conta, estado da sincronização e o comando **Sincronizar agora**. Ao voltar ao aplicativo ou recuperar a internet, ele tenta sincronizar novamente. O primeiro snapshot remoto é criado sem apagar os dados locais; registros anteriores sem conexão continuam válidos.

## Validação automatizada

A checagem TypeScript, a suíte com 15 arquivos e 33 testes e o build estático passaram. A rota pública de Preferências foi conferida depois do deploy do commit `5aaec58`, exibindo os campos de e-mail, senha, criação de conta e estado local.

## Pendência de uso real

A validação entre dois dispositivos depende de o responsável criar a conta no próprio aplicativo e entrar com a mesma conta em celular e computador. Essa etapa não deve ser simulada com dados de teste, pois é o primeiro snapshot real da obra.
