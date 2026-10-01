# senacomercial.com

site institucional da sena comercial. estático, sem build: html + css + js.

## estrutura

- `index.html` — página genérica (todos os nichos)
- `assets/site.css` — tokens e componentes (segue o DESIGN.md)
- `assets/site.js` — motions (gsap + scrolltrigger + lenis), cronômetro e contatos
- `assets/img` — logo vetorizada (lobo, wordmark, logo completa)
- `assets/fonts`, `assets/vendor` — fontes e libs hospedadas no próprio site
- `vercel.json` — urls limpas e cache

## contatos

tudo em um lugar só: bloco `CONFIG` no topo de `assets/site.js` (whatsapp, mensagem, e-mail).

## páginas nichadas

crie uma pasta por nicho com um `index.html` dentro (ex: `imobiliario/index.html`) reaproveitando
`/assets/site.css` e `/assets/site.js`. a url fica `senacomercial.com/imobiliario`.

## rodar local

```
npx serve .
```

## deploy

projeto vercel conectado a este repositório, framework preset "other", sem build command. cada push na `main` publica.
