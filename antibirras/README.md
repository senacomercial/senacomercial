# antibirras

páginas de venda do "Sistema Autoridade Amorosa de 3 Pilares" (acabe com as birras).
url base: `senacomercial.com/antibirras`

## estrutura

```
antibirras/
  {idioma}/             br, es, fr...
    {estilo}/           lp-01, lp-02...
      index.html        -> senacomercial.com/antibirras/{idioma}/{estilo}
```

mesma convenção de `brilliant-minds/`: 1º nível idioma, 2º nível estilo da página.

- `br/lp-02` — português, estilo 02 (hero com foto logo após o título no mobile, curva da crise, garantia de 15 dias)

## lp-02: o que está embutido

- meta pixel `1500638468627308`: PageView, ViewContent e InitiateCheckout (clique em qualquer botão de compra)
- repasse de utm, `sck` e afiliado para o checkout do hotmart (`a[data-cta]`)
- checkout: `https://pay.hotmart.com/S107169445M?bid=1786749735103`
- imagens embutidas em base64 (arquivo único), sem assets externos além das fontes do google
- `noindex, nofollow`, igual às outras lps do repositório

## pendências

- trocar a foto de capa (`.hero__photo`) pela imagem de criança em birra no supermercado
- incluir foto de mãe exausta na seção 2 (reinserir um `<figure class="dor__foto">` com `<img class="dor__img">` no bloco `.dor__titulo`, logo após o parágrafo de abertura)
- confirmar no hotmart que a garantia configurada é de 15 dias
- ativar o pixel `1500638468627308` também no produto do hotmart, para o evento Purchase
