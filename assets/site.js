/* sena comercial — site.js */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — único lugar para trocar os contatos do site
     whatsapp: só números, com DDI e DDD (ex: '5532999999999').
     vazio = os botões levam para a seção de contato / e-mail.
  ------------------------------------------------------------------ */
  var CONFIG = {
    whatsapp: '5532999526417',
    mensagem: 'Oi, Sena. Quero agendar uma análise da minha operação comercial.',
    email: 'contato@senacomercial.com'
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var t0 = performance.now();

  /* ---------- contatos ---------- */
  var ctaHref = CONFIG.whatsapp
    ? 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.mensagem)
    : null;
  $$('[data-cta]').forEach(function (a) {
    if (ctaHref) { a.href = ctaHref; a.target = '_blank'; a.rel = 'noopener'; }
    else if (a.closest('#contato')) { a.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('Análise da operação comercial'); }
  });
  $$('[data-mail]').forEach(function (a) { a.href = 'mailto:' + CONFIG.email; a.textContent = CONFIG.email; });
  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- cronômetro (mm:ss.mmm desde a abertura da página) ---------- */
  var timers = $$('[data-timer]').map(function (el) {
    var short = el.dataset.timer === 'cta';
    var tpl = short ? '00:00' : '00:00.000';
    el.innerHTML = tpl.split('').map(function (c, i) {
      var sep = c === ':' || c === '.';
      return '<b class="' + (sep ? 'sep' : '') + (i > 5 ? ' ms' : '') + '">' + c + '</b>';
    }).join('');
    return { cells: $$('b', el), short: short, last: '' };
  });
  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }
  function tick() {
    var ms = performance.now() - t0;
    var m = Math.floor(ms / 60000) % 100, s = Math.floor(ms / 1000) % 60, r = Math.floor(ms % 1000);
    var full = pad(m, 2) + ':' + pad(s, 2) + '.' + pad(r, 3);
    timers.forEach(function (t) {
      var str = (t.short || reduced) ? full.slice(0, 5) + (t.short ? '' : '.000') : full;
      if (str === t.last) return;
      for (var i = 0; i < str.length; i++) if (str[i] !== t.last[i]) t.cells[i].textContent = str[i];
      t.last = str;
    });
    requestAnimationFrame(tick);
  }
  if (timers.length) requestAnimationFrame(tick);

  /* ---------- acordeões ---------- */
  $$('[data-acc]').forEach(function (acc) {
    $$('.acc-btn', acc).forEach(function (btn, i) {
      var item = btn.parentElement, panel = $('.acc-panel', item);
      panel.id = panel.id || 'p' + Math.random().toString(36).slice(2, 8);
      btn.setAttribute('aria-controls', panel.id);
      btn.addEventListener('click', function () {
        var open = !item.classList.contains('open');
        $$('.acc-item.open', acc).forEach(function (o) {
          o.classList.remove('open'); $('.acc-btn', o).setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (hasGsap) setTimeout(function () { ScrollTrigger.refresh(); }, 650);
      });
    });
  });

  /* ---------- manifesto: separa em palavras ---------- */
  var scrubEl = $('[data-scrub]'), words = [];
  if (scrubEl) {
    var txt = scrubEl.textContent.trim();
    scrubEl.setAttribute('aria-label', txt);
    scrubEl.innerHTML = txt.split(/\s+/).map(function (w) { return '<span class="w" aria-hidden="true">' + w + '</span>'; }).join(' ');
    words = $$('.w', scrubEl);
  }

  /* ---------- nav: vira pílula ao rolar, some ao descer ---------- */
  var nav = $('.nav'), lastY = 0, up = 0;
  function onScroll() {
    var y = window.scrollY, d = y - lastY;
    nav.classList.toggle('is-stuck', y > 60);
    if (d > 0) { up = 0; if (y > 600) nav.classList.add('is-hidden'); }
    else { up -= d; if (up > 80 || y < 600) nav.classList.remove('is-hidden'); }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var startEl = $('.start');

  /* sem gsap ou com movimento reduzido: página estática, tudo visível */
  if (!hasGsap || reduced) {
    if (startEl) startEl.remove();
    words.forEach(function (w) { w.classList.add('lit'); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- rolagem suave ---------- */
  var lenis = null, velocity = 0;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.1, anchors: { offset: -96 } });
    lenis.on('scroll', function (e) { velocity = e.velocity; ScrollTrigger.update(); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  /* ---------- largada: 5 luzes acendem, apagam, a página arranca ---------- */
  var lights = $$('.start-lights i'), label = $('.start-label');
  gsap.set('.hero .line-in', { yPercent: 115 });
  gsap.set('[data-hero-fade] > *', { y: 24, autoAlpha: 0 });
  gsap.set('.nav-in', { y: -24, autoAlpha: 0 });
  gsap.set('[data-pit]', { clipPath: 'inset(100% 0% 0% 0% round 64px)' });
  gsap.set('[data-pit-wolf]', { scale: 1.25, yPercent: 12 });

  var intro = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: function () { if (startEl) startEl.remove(); ScrollTrigger.refresh(); }
  });
  lights.forEach(function (l, i) { intro.call(function () { l.classList.add('on'); }, null, 0.15 + i * 0.17); });
  intro
    .call(function () {
      lights.forEach(function (l) { l.classList.remove('on'); });
      if (label) label.textContent = 'sinal verde';
    }, null, 1.25)
    .to(startEl, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 1.4)
    .call(function () { if (lenis) lenis.start(); }, null, 1.8)
    .to('.hero .line-in', { yPercent: 0, duration: 1.2, stagger: 0.09 }, 1.85)
    .to('[data-pit]', { clipPath: 'inset(0% 0% 0% 0% round 64px)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' }, 1.7)
    .to('[data-pit-wolf]', { scale: 1, yPercent: 0, duration: 1.6 }, 2.0)
    .to('[data-hero-fade] > *', { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 2.35)
    .to('.nav-in', { y: 0, autoAlpha: 1, duration: 1, clearProps: 'transform' }, 2.35);

  /* ---------- lobo: inclina com o ponteiro, desce com a rolagem ---------- */
  var pit = $('[data-pit]'), wolf = $('[data-pit-wolf] .wolf');
  if (pit && wolf && window.matchMedia('(pointer: fine)').matches) {
    var rx = gsap.quickTo(wolf, 'rotationX', { duration: 0.8, ease: 'power3' });
    var ry = gsap.quickTo(wolf, 'rotationY', { duration: 0.8, ease: 'power3' });
    var tx = gsap.quickTo(wolf, 'x', { duration: 0.8, ease: 'power3' });
    pit.addEventListener('pointermove', function (e) {
      var r = pit.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 22); rx(-py * 16); tx(px * 18);
    });
    pit.addEventListener('pointerleave', function () { rx(0); ry(0); tx(0); });
  }
  if (pit) {
    gsap.to('[data-pit-wolf]', {
      yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: pit, start: 'top top+=120', end: 'bottom top', scrub: true }
    });
  }

  /* ---------- marquee: acelera e inclina com a velocidade da rolagem ---------- */
  $$('[data-marquee]').forEach(function (mq) {
    var track = $('.marquee-track', mq);
    track.innerHTML += track.innerHTML + track.innerHTML;
    var x = 0, dir = -1, sk = 0;
    gsap.ticker.add(function (t, dt) {
      if (Math.abs(velocity) > 0.5) dir = velocity > 0 ? -1 : 1;
      x += dir * (0.07 + Math.min(Math.abs(velocity), 60) * 0.012) * dt;
      var w = track.scrollWidth / 3;
      if (x <= -w) x += w; else if (x > 0) x -= w;
      sk += (gsap.utils.clamp(-10, 10, velocity * -0.25) - sk) * 0.12;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0) skewX(' + sk.toFixed(2) + 'deg)';
      velocity *= 0.92;
    });
  });

  /* ---------- manifesto: palavras acendem conforme a rolagem ---------- */
  if (words.length) {
    ScrollTrigger.create({
      trigger: scrubEl, start: 'top 82%', end: 'bottom 45%', scrub: true,
      onUpdate: function (self) {
        var n = Math.round(self.progress * words.length);
        words.forEach(function (w, i) { w.classList.toggle('lit', i < n); });
      }
    });
  }

  /* ---------- títulos de seção: sobem por trás da máscara ---------- */
  $$('.section-head .display, .versus h2').forEach(function (h) {
    var inner = document.createElement('span');
    inner.className = 'line-in';
    while (h.firstChild) inner.appendChild(h.firstChild);
    var line = document.createElement('span');
    line.className = 'line';
    line.appendChild(inner); h.appendChild(line);
    gsap.from(inner, {
      yPercent: 105, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 88%' }
    });
  });

  /* ---------- método: cards empilham e o de baixo recua ---------- */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', function () {
    var steps = $$('[data-step]');
    steps.forEach(function (card, i) {
      if (i === steps.length - 1) return;
      gsap.to(card, {
        scale: 0.9 + i * 0.03, ease: 'none',
        scrollTrigger: { trigger: steps[i + 1], start: 'top bottom', end: 'top top+=104', scrub: true }
      });
    });
  });
  /* ---------- números: o bloco preto abre até a borda e conta ---------- */
  var numbers = $('[data-numbers]');
  if (numbers) {
    gsap.fromTo(numbers,
      { clipPath: 'inset(0% 6% 0% 6% round 64px 64px 0px 0px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 64px 64px 0px 0px)', ease: 'none',
        scrollTrigger: { trigger: numbers, start: 'top bottom', end: 'top 25%', scrub: true } });
    $$('[data-count]', numbers).forEach(function (el) {
      var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec, 10) || 0, o = { v: 0 };
      var fmt = function (v) { return v.toFixed(dec).replace('.', ','); };
      el.textContent = fmt(0);
      gsap.to(o, {
        v: end, duration: 2, ease: 'expo.out',
        onUpdate: function () { el.textContent = fmt(o.v); },
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    gsap.from('.stat', {
      y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: '.stats', start: 'top 85%' }
    });
  }

  /* ---------- versus: o card de palco apaga, o da sena entra ---------- */
  gsap.from('.vcard-b', {
    yPercent: 16, rotation: 3, transformOrigin: '0% 100%', ease: 'none',
    scrollTrigger: { trigger: '.versus-grid', start: 'top 95%', end: 'top 40%', scrub: true }
  });

  /* ---------- tic-tac: a largura da letra bate como ponteiro ---------- */
  var tictac = $('[data-tictac]');
  if (tictac) {
    var parts = $$('span', tictac), flip = false, clock = null;
    var beat = function () {
      flip = !flip;
      gsap.to(parts[0], { '--wdth': flip ? 125 : 62, duration: 0.55, ease: 'expo.out' });
      gsap.to(parts[1], { '--wdth': flip ? 62 : 125, duration: 0.55, ease: 'expo.out' });
    };
    ScrollTrigger.create({
      trigger: tictac, start: 'top bottom', end: 'bottom top',
      onToggle: function (self) {
        clearInterval(clock);
        if (self.isActive) { beat(); clock = setInterval(beat, 1000); }
      }
    });
  }

  /* ---------- botões magnéticos ---------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('[data-magnetic]').forEach(function (b) {
      var bx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' });
      var by = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        bx((e.clientX - r.left - r.width / 2) * 0.25); by((e.clientY - r.top - r.height / 2) * 0.35);
      });
      b.addEventListener('pointerleave', function () { bx(0); by(0); });
    });
  }

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
