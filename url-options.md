# Alternativas de URL pública — Plataforma Negócio Fechado

## Situação atual

O endereço atual é `https://diegomes42.github.io/projeto-piloto-plataforma-negocio-fechado/`. A configuração do GitHub Pages não possui domínio personalizado e já aplica HTTPS.

## Alternativas avaliadas

| Alternativa | Exemplo de endereço | Custo de hospedagem | Impacto técnico | Avaliação |
| --- | --- | --- | --- | --- |
| Manter o endereço atual | `diegomes42.github.io/projeto-piloto-plataforma-negocio-fechado` | Nenhum | Nenhum | Funciona, mas é longo e mantém o nome de piloto. |
| Renomear o repositório | `diegomes42.github.io/modulo-obras` | Nenhum | Requer ajustar o caminho base de build e comunicar a troca de link. | Boa solução temporária e gratuita. |
| Usar domínio próprio com subdomínio | `obras.plataformanegociofechado.com` | Hospedagem gratuita; exige possuir/renovar o domínio | Exige DNS e configuração do domínio no GitHub Pages. | **Recomendação para a marca e para futuros módulos.** |
| Usar domínio próprio principal | `plataformanegociofechado.com` | Hospedagem gratuita; exige possuir/renovar o domínio | Exige DNS; é mais adequado para uma página institucional/portal. | Recomendado quando existirem vários módulos. |

## Recomendação

Para a arquitetura de marca definida, o caminho mais consistente é manter **Plataforma Negócio Fechado** como domínio principal e publicar o módulo atual em um subdomínio, por exemplo:

> `obras.plataformanegociofechado.com`

No futuro, o módulo de gestão poderia usar `gestao.plataformanegociofechado.com`, sem misturar os produtos, os links e os dados do usuário. O GitHub Pages aceita domínio personalizado e, para subdomínios, exige um registro `CNAME` apontando diretamente para `diegomes42.github.io`, sem incluir o nome do repositório.[1]

Se ainda não houver domínio próprio, a medida imediata mais simples é renomear o repositório para `modulo-obras`. O endereço passaria a ser `https://diegomes42.github.io/modulo-obras/`. Essa mudança não deve ser feita sem confirmação porque altera a URL já compartilhada e requer ajustar a configuração de build usada no Pages.

## Próximo passo necessário

Confirmar uma das opções abaixo antes de alterar qualquer endereço:

1. Informar um domínio já comprado, para configurar um subdomínio como `obras.seudominio.com`; ou
2. Autorizar a renomeação do repositório para `modulo-obras` como solução gratuita temporária.

## Referências

[1]: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site "GitHub Docs — Managing a custom domain for your GitHub Pages site"
