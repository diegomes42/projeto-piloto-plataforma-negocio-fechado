# Proposta — Sincronização entre celular e computador

## Objetivo

Permitir que o **Módulo: Obras** apresente os mesmos registros no celular e no computador, preservando o modo de uso atual, os backups locais e a possibilidade de trabalhar sem conexão por um curto período.

## Alternativas avaliadas

| Abordagem | Como funciona no uso diário | Custo | Complexidade de implantação | Limitação principal |
| --- | --- | --- | --- | --- |
| Backup e restauração manual | O usuário exporta um JSON em um dispositivo e restaura no outro. | Gratuito. | Muito baixa. | Não é sincronização automática e cria risco de esquecer a cópia mais recente. |
| Sincronização na nuvem com login individual | Cada alteração é guardada localmente e enviada à nuvem quando houver conexão. O mesmo usuário entra no celular e no computador. | Pode iniciar no plano gratuito do Supabase. | Média; exige criar uma conta/projeto e configurar credenciais públicas de acesso. | Projetos gratuitos podem ser pausados após sete dias de inatividade.[1] |
| Servidor próprio e banco privado | O sistema teria API e banco administrados em um servidor dedicado. | Pago. | Alta. | Não se justifica para o estágio atual do Módulo: Obras. |

## Proposta recomendada: sincronização individual na nuvem

Para o uso inicial, a recomendação é criar uma conta de acesso por e-mail e senha para o responsável pela obra. Depois de entrar com a mesma conta em celular e computador, os dois dispositivos passam a trabalhar sobre a mesma obra. A hospedagem do aplicativo continua gratuita no GitHub Pages; somente os dados operacionais passam a ficar em uma base na nuvem.

> A base local continua existindo como proteção: o lançamento é salvo primeiro no dispositivo e sincronizado logo depois. Se não houver internet, a tela deve informar “pendente de sincronização” e enviar os dados ao reconectar.

O plano gratuito avaliado inclui banco de dados, autenticação e atualizações de dados, com limites compatíveis com um piloto de poucos usuários. A documentação informa 500 MB de banco, até 50 mil usuários ativos mensais e duas bases ativas; projetos gratuitos são pausados após uma semana sem atividade.[1] A autenticação permite e-mail/senha e protege dados por usuário com regras de acesso na própria base.[2]

## Dados que entram na primeira sincronização

| Grupo | Registros sincronizados |
| --- | --- |
| Obra | Nome, localização, situação e descrição. |
| Campo | Diário, frentes, serviços, eventos e ações. |
| Recursos | Recebimentos de materiais com custos, equipe/alocações, máquinas e horímetros. |
| Planejamento já existente | Metas semanais e demais configurações operacionais já salvas. |
| Evidências fotográficas | Incluídas em uma segunda subetapa da sincronização, armazenadas como arquivos, para não inflar os registros do banco. |

## Regras para evitar perda de dados

Cada registro receberá uma data de atualização e será sincronizado individualmente. Registros novos em um dispositivo aparecerão no outro; alterações no mesmo registro terão aviso quando uma versão mais nova já existir na nuvem. Na primeira etapa, o sistema não excluirá dados automaticamente.

Antes de ativar a nuvem, o aplicativo gerará um backup JSON local. Na primeira entrada, os dados atuais serão enviados uma única vez para criar a cópia inicial da obra, sem apagar o conteúdo guardado no navegador.

## Limite proposital desta etapa

O primeiro ciclo é para **o mesmo responsável acessar em dois dispositivos**. Compartilhar a obra com outras pessoas, permissões por função e convites formais fica para a próxima etapa, depois de a sincronização pessoal estar estável. Isso evita introduzir controle de usuários complexo antes da necessidade real.

## Próximas decisões necessárias

1. Confirmar se a primeira sincronização será somente para **o seu próprio acesso em celular e computador**; e
2. Autorizar a criação de uma conta gratuita no serviço de sincronização e a inclusão do login simples no Módulo: Obras.

## Referências

[1]: https://supabase.com/pricing "Supabase Pricing"
[2]: https://supabase.com/docs/guides/auth "Supabase Docs — Auth"
