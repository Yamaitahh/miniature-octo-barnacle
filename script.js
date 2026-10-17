/* PixelTrucos · script.js (sin cookies, sin rastreo, sin peticiones externas) */
(function () {
  'use strict';
  var d = document;

  // Menú del móvil
  var btn = d.getElementById('menu-btn');
  var menu = d.getElementById('menu');
  if (btn && menu) {
    var cerrar = function () {
      menu.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menú');
    };
    btn.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
  }

  // Aparecer al hacer scroll
  var elementos = d.querySelectorAll('.rev');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visto');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    elementos.forEach(function (el) { obs.observe(el); });
  } else {
    elementos.forEach(function (el) { el.classList.add('visto'); });
  }

  // Texto que se escribe solo en la portada
  var t = d.getElementById('typed');
  if (t) {
    var frases = [];
    try { frases = JSON.parse(t.getAttribute('data-frases') || '[]'); } catch (err) { frases = []; }
    if (frases.length) {
      var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducir) {
        t.textContent = frases[0];
      } else {
        var i = 0, j = 0, borrando = false;
        (function paso() {
          var f = String(frases[i]);
          t.textContent = f.slice(0, j);
          var espera = borrando ? 35 : 70;
          if (!borrando && j === f.length) { borrando = true; espera = 1600; }
          else if (borrando && j === 0) { borrando = false; i = (i + 1) % frases.length; espera = 400; }
          j += borrando ? -1 : 1;
          setTimeout(paso, espera);
        })();
      }
    }
  }

  // Buscador y filtros de la página de guías
  var rejilla = d.getElementById('rejilla-guias');
  var buscar = d.getElementById('buscar');
  if (rejilla && buscar) {
    var tarjetas = Array.prototype.slice.call(rejilla.querySelectorAll('.tarjeta'));
    var botones = Array.prototype.slice.call(d.querySelectorAll('[data-filtro]'));
    var vacio = d.getElementById('sin-resultados');
    var cat = 'todas';

    var aplicar = function () {
      var txt = (buscar.value || '').toLowerCase().trim();
      var n = 0;
      tarjetas.forEach(function (c) {
        var ok = (cat === 'todas' || c.getAttribute('data-cat') === cat) &&
                 (!txt || (c.getAttribute('data-texto') || '').indexOf(txt) !== -1);
        c.hidden = !ok;
        if (ok) n++;
      });
      if (vacio) vacio.hidden = n > 0;
      botones.forEach(function (b) {
        var activo = b.getAttribute('data-filtro') === cat;
        b.classList.toggle('activo', activo);
        b.setAttribute('aria-pressed', activo ? 'true' : 'false');
      });
    };

    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.getAttribute('data-filtro');
        if (window.history && history.replaceState) {
          history.replaceState(null, '', cat === 'todas' ? location.pathname : '#' + cat);
        }
        aplicar();
      });
    });
    buscar.addEventListener('input', aplicar);

    var hash = '';
    try { hash = decodeURIComponent(location.hash.slice(1)).toLowerCase(); } catch (err) { hash = ''; }
    if (botones.some(function (b) { return b.getAttribute('data-filtro') === hash; })) cat = hash;
    aplicar();
  }
})();
