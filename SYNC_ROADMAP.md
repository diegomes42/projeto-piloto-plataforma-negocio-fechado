# Roadmap de sincronização entre dispositivos

## Estado atual

O Projeto Piloto utiliza `localStorage` no navegador. Essa decisão mantém o uso simples, sem login, banco de dados ou custo de infraestrutura, mas faz com que cada navegador possua seu próprio conjunto de dados. O backup JSON é o mecanismo atual para transportar uma cópia da obra entre dispositivos.

## Quando migrar

A sincronização deve ser iniciada somente quando houver uma necessidade concreta de manter a mesma obra atualizada em mais de um dispositivo, ou quando mais de uma pessoa precisar registrar e acompanhar informações simultaneamente. Até esse ponto, o fluxo local-first e o backup semanal tendem a ser mais simples de operar.

| Gatilho observado | Evolução recomendada |
|---|---|
| Uso ocasional em um segundo dispositivo | Exportar e restaurar o backup JSON. |
| Uso recorrente em celular e computador | Criar autenticação e sincronização por usuário. |
| Mais de uma pessoa lançando dados | Criar usuários, permissões e registro de autoria. |
| Fotos maiores ou muitas evidências | Migrar as imagens para armazenamento de arquivos, mantendo metadados no banco. |

## Arquitetura sugerida para a fase compartilhada

Uma evolução segura separa os dados em quatro partes: autenticação, banco transacional para diários/frentes/eventos/ações, armazenamento de arquivos para evidências e interface web responsiva. Cada registro deve manter identificador, obra, autor, data de criação e data de atualização para resolver conflitos e construir histórico auditável.

> O `localStorage` não deve ser removido de uma vez. A migração deve começar com importação do backup JSON atual, seguida de sincronização explícita e confirmação visual para o usuário.

## Sequência de migração

1. Criar uma versão compartilhada separada do piloto, sem alterar a versão local em produção.
2. Implementar login e uma única obra inicial para validar acesso e escopo de dados.
3. Importar um backup JSON real do Jardim Planalto para popular a primeira obra compartilhada.
4. Validar diário, produção, ações e evidências em celular e computador.
5. Só então habilitar convite de colaboradores e regras de permissão.

## Critérios de aceite

A fase de sincronização estará pronta para adoção quando um diário criado no celular aparecer no computador, evidências preservarem o vínculo com o diário, atualizações concorrentes tiverem comportamento previsível e o usuário conseguir exportar uma cópia independente da obra.
