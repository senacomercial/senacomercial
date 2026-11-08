# brilliant-minds

versões de lp e traduções do projeto mente brilhante / brilliant minds.
url base: `senacomercial.com/brilliant-minds`

## estrutura

```
brilliant-minds/
  index.html            hub interno (noindex) listando as versões
  {idioma}/             tradução do produto: br, fr, es...
    {estilo}/           estilo/design da página de vendas e oferta: lp-orig, lp-01, lp-02...
      index.html        -> senacomercial.com/brilliant-minds/{idioma}/{estilo}
      assets/ ou img/   arquivos da própria página
```

- `br/lp-orig` — português, estilo original
- `br/lp-01` — português, estilo 01 (claude design: bricolage grotesque, quiz do foco, oferta r$ 19,90)
- `fr/lp-01` — francês, estilo 01

## convenção

- 1º nível = idioma (código curto minúsculo): `br` português, `fr` francês, `es` espanhol, `en`, `de`, `it`...
- 2º nível = estilo/design da página de vendas e ofertas. o slug do estilo é o mesmo em todos os idiomas:
  `lp-orig`, `lp-01`, `lp-02`...
- o mesmo estilo traduzido fica em paralelo: `br/lp-01`, `fr/lp-01`, `es/lp-01`
- cada página é autocontida: assets dentro da própria pasta, com caminho absoluto
  (ex: `/brilliant-minds/fr/lp-01/img/hero.svg`)
- novo estilo: crie `lp-0X` no idioma base e depois copie pros outros idiomas traduzindo
- novo idioma: crie `brilliant-minds/{idioma}/` e copie os estilos que quiser traduzir
- ao copiar, troque `/brilliant-minds/{idioma-antigo}/{estilo-antigo}/` pelo novo caminho
- adicione a nova página no `index.html` do hub

## obs

as páginas originais em `/mentesbrilhantesoriginal` e `/lp/mentebrilhante-fr` continuam no ar.
as de `brilliant-minds/` são cópias com caminhos ajustados. quando migrar o tráfego, dá pra apontar
as urls antigas pra cá com redirects no `vercel.json`.
