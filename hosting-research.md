# Comparação de hospedagem gratuita — Obra Intelligence

## Conclusões

- GitHub Pages hospeda apenas site estático e não deve ser usado para este SaaS; a documentação oficial limita o uso e não oferece API, banco ou execução server-side.
- Google Cloud oferece Cloud Run com camada gratuita mensal, mas o banco Cloud SQL aparece como trial de 30 dias, não como base permanente gratuita. Há risco maior de cobrança e complexidade operacional.
- AWS oferece plano gratuito/créditos para contas novas e serviços always-free dentro de limites, mas RDS, armazenamento e tráfego exigem configuração cuidadosa e podem gerar complexidade/cobrança após créditos.
- Vercel e Netlify encaixam melhor no frontend + funções serverless, mas ainda exigem banco externo, storage de arquivos e configuração de OAuth.
- Manus continua sendo o caminho de menor esforço porque já fornece frontend, Express/tRPC, banco, autenticação, storage e domínio integrados.

## Fontes oficiais

[1]: https://cloud.google.com/free
[2]: https://cloud.google.com/run/pricing
[3]: https://aws.amazon.com/free/
[4]: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
[5]: https://vercel.com/docs/frameworks/backend/express
[6]: https://docs.netlify.com/build/frameworks/framework-setup-guides/express/

## Composição recomendada para menor risco de cobrança

Para o uso próprio e poucos usuários, a composição de menor risco é manter **frontend, API, banco MySQL, autenticação OAuth, storage de fotos e domínio no Manus WebDev**. Isso evita distribuir o sistema entre cinco serviços com faturamentos e credenciais separados. A aplicação já está configurada para esse cenário e o domínio publicado permanece disponível.

Se a prioridade absoluta for sair do Manus, a composição externa mais simples é **Vercel para frontend + API Express serverless, banco MySQL gerenciado separado, OAuth Manus com callback atualizado e storage S3 compatível**. GitHub Pages ficaria apenas como repositório e CI, não como hospedagem da aplicação. Essa alternativa aumenta o número de contas, variáveis, pontos de falha e superfícies de cobrança; não é a opção de menor risco operacional.

| Camada | Recomendada para este MVP | Alternativa externa | Risco principal |
| --- | --- | --- | --- |
| Frontend | Manus WebDev | Vercel | Limites e política do provedor |
| API | Manus WebDev/Express integrado | Vercel Function ou Netlify Function | Cold starts e diferenças serverless |
| Banco | Banco integrado do Manus | MySQL gerenciado externo | Cobrança por instância, armazenamento e conexão |
| Autenticação | Manus OAuth integrado | Mesmo OAuth com callback externo | Callback e cookies precisam ser reconfigurados |
| Fotos/documentos | Storage integrado do Manus | S3 ou storage compatível | Egress, armazenamento e credenciais |
| Domínio | `manus.space` | `vercel.app` ou domínio próprio | Registro e renovação do domínio |

A recomendação prática, portanto, é começar no **Manus WebDev** enquanto o uso permanecer pequeno. Caso a conta externa seja uma exigência, escolher **Vercel** para concentrar frontend e API, mas configurar alertas de orçamento e não ativar serviços pagos sem revisar os limites. Google Cloud e AWS são tecnicamente viáveis, porém têm mais componentes e maior risco de configuração incorreta; GitHub Pages não atende ao backend desta aplicação.
