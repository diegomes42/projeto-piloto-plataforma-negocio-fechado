# PocketBase ou base gerenciada — Sincronização do Módulo: Obras

## Resposta curta

O **PocketBase é tecnicamente mais simples como produto**, pois reúne SQLite, autenticação, arquivos e atualizações em tempo real em um único executável. Porém, para este Módulo: Obras publicado em GitHub Pages, ele não é a opção mais simples de operar: precisa ficar em um servidor ligado continuamente e usar disco persistente para não perder a base de dados.[1] [2]

Para o uso atual de uma pessoa no celular e no computador, a base gerenciada continua sendo a recomendação mais prática. Ela permite manter o site estático no GitHub Pages e adiciona somente banco, login e sincronização prontos, sem administrar servidor, atualizações do executável, volume ou backup do sistema operacional.

## Comparação

| Critério | PocketBase | Base gerenciada com login |
| --- | --- | --- |
| Uso do sistema | Banco, login, arquivos e tempo real em um único executável. | Banco, login e regras de acesso já disponíveis como serviço. |
| Hospedagem | É auto-hospedado; requer servidor sempre disponível. | A aplicação continua no GitHub Pages; somente os dados ficam na nuvem. |
| Dados persistentes | Precisa de volume/disco persistente para `pb_data`. | Persistência é fornecida junto com a base de dados. |
| Backup operacional | Responsabilidade do responsável pelo servidor e da cópia de `pb_data`. | Ainda exige backup do aplicativo, mas a infraestrutura de banco é administrada pelo serviço. |
| Integração no frontend | Usa SDK JavaScript e tela de login criada no próprio app. | Usa SDK JavaScript e tela de login criada no próprio app. |
| Evolução | Projeto ainda em desenvolvimento ativo e sem garantia de compatibilidade plena antes da versão 1.0. | Serviço gerenciado com autenticação e regras de acesso integradas. |
| Adequação agora | Boa se você já possuir um servidor permanente que controle. | **Melhor para começar a sincronizar um único acesso sem cuidar de servidor.** |

## Custos e implicações

PocketBase não oferece hospedagem própria. A documentação orienta publicar o executável em um servidor e manter seus dados em armazenamento persistente; para ambiente de produção, também recomenda medidas como controle de taxa, cópia de segurança e configuração de e-mail para autenticação.[2] [3]

Já a base gerenciada avaliada pode iniciar no plano gratuito, com banco, autenticação e atualizações de dados; o plano gratuito informado possui 500 MB de banco e pode pausar a base após sete dias de inatividade.[4]

> Para o seu piloto, a questão não é capacidade: os dois atendem. A diferença é **quem administra a infraestrutura**. Com PocketBase, é você; com uma base gerenciada, o serviço assume essa parte.

## Recomendação

Começar com uma base gerenciada para sincronizar a mesma conta em celular e computador. A arquitetura deve manter um backup JSON local, sincronizar por registro e não excluir dados automaticamente na primeira versão.

PocketBase permanece uma alternativa válida mais adiante se você decidir ter um servidor próprio permanente, quiser concentrar dados sob seu controle direto e aceitar a responsabilidade de aplicar atualizações, monitorar o serviço e manter backups do servidor.

## Referências

[1]: https://pocketbase.io/docs/ "PocketBase Docs — Introduction"
[2]: https://pocketbase.io/docs/going-to-production/ "PocketBase Docs — Going to production"
[3]: https://pocketbase.io/faq/ "PocketBase FAQ"
[4]: https://supabase.com/pricing "Supabase Pricing"
