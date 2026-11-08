# brilliant-minds

versões de lp e traduções do projeto mente brilhante / brilliant minds.
url base: `senacomercial.com/brilliant-minds`

## estrutura

```
brilliant-minds/
  index.html          hub interno (noindex) listando as versões
  {idioma}/
    {versao}/
      index.html      -> senacomercial.com/brilliant-minds/{idioma}/{versao}
      assets/ ou img/ arquivos da própria versão
```

- `br/lp-orig` — original em português
- `fr/lp-01` — versão em francês

## convenção

- idioma = código iso curto em minúsculo: `br`, `fr`, `en`, `es`, `de`, `it`...
- versão = `lp-orig` para a original do idioma, `lp-01`, `lp-02`... para variações/testes
- cada versão é autocontida: assets dentro da própria pasta, referenciados com caminho absoluto
  (ex: `/brilliant-minds/fr/lp-01/img/hero.svg`)
- nova versão: copie uma pasta existente, renomeie e troque os caminhos `/brilliant-minds/{idioma}/{versao-antiga}/` pelo novo
- novo idioma: crie `brilliant-minds/{idioma}/` e coloque as versões dentro
- adicione a nova versão no `index.html` do hub

## obs

as páginas originais em `/mentesbrilhantesoriginal` e `/lp/mentebrilhante-fr` continuam no ar.
as de `brilliant-minds/` são cópias com caminhos ajustados. quando migrar o tráfego, dá pra apontar
as urls antigas pra cá com redirects no `vercel.json`.
