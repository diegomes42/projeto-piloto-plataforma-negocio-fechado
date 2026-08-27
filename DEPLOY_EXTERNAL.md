# Deploy externo do Obra Intelligence

## Estratégia escolhida

O projeto continua sendo uma aplicação React + Express + tRPC. Para um MVP de uso próprio, a opção mais simples é publicar o frontend e a API no mesmo provedor, com o Express executado como função serverless. O Vercel documenta suporte direto a aplicações Express como uma única Vercel Function [1]. O Netlify oferece o mesmo modelo por meio de Netlify Functions e `serverless-http` [2].

Esta configuração não usa processos permanentes, WebSockets ou tarefas em segundo plano. O banco continua externo e deve aceitar conexões de curta duração; o storage de evidências continua sendo o storage integrado ao projeto ou um bucket compatível configurado por ambiente.

## Arquivos incluídos

| Arquivo | Finalidade |
|---|---|
| `vercel.json` | Build, diretório publicado e rewrites da API/SPA |
| `api/index.ts` | Entrada serverless do Express no Vercel |
| `netlify.toml` | Build, função e rewrites no Netlify |
| `netlify/functions/api.ts` | Entrada serverless do Express no Netlify |
| `server/_core/app.ts` | Montagem compartilhada do Express |

## Variáveis de ambiente

Configure no provedor externo as mesmas variáveis usadas pelo projeto. Para funcionamento completo, inclua `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`, `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY`, `OWNER_OPEN_ID` e `OWNER_NAME`. Não commite valores reais no repositório.

Depois do primeiro deploy, atualize no provedor OAuth o callback para o domínio externo, usando `/api/oauth/callback`, e valide o login antes de cadastrar novos dados.

## Publicação no Vercel

Importe o repositório, mantenha `pnpm build` como build command e use `dist/public` como output directory. O arquivo `api/index.ts` será reconhecido como função. O Vercel informa que aplicações Express são executadas como uma única função e que arquivos públicos devem ser servidos pelo diretório de publicação, não por `express.static()` [1].

## Publicação no Netlify

Importe o repositório e mantenha `pnpm build` como build command. O `netlify.toml` já aponta `dist/public` como publicação e `netlify/functions` como diretório de funções. A rota `/api/*` é encaminhada para a função Express, conforme o padrão documentado pelo Netlify [2].

## Limitações práticas

O banco e o storage não ficam hospedados automaticamente por Vercel ou Netlify apenas porque o código foi publicado. Também não há garantia de gratuidade ou permanência ilimitada; limites e políticas do provedor podem mudar. Para o seu uso próprio, esta arquitetura é adequada enquanto o volume for baixo e não houver processamento contínuo.

## Referências

[1]: https://vercel.com/docs/frameworks/backend/express "Express on Vercel"
[2]: https://docs.netlify.com/build/frameworks/framework-setup-guides/express/ "Express on Netlify"
