/* PixelTrucos · calculadora de eDPI (todo en tu navegador) */
(function () {
  'use strict';
  function $(id) { return document.getElementById(id); }
  function fmt(n) { return (Math.round(n * 1000) / 1000).toString().replace('.', ','); }
  function escribir(el, partes) {
    el.textContent = '';
    partes.forEach(function (p) {
      if (typeof p === 'string') { el.appendChild(document.createTextNode(p)); return; }
      var s = document.createElement('strong');
      s.textContent = p.b;
      el.appendChild(s);
    });
  }

  $('b1').addEventListener('click', function () {
    var dpi = parseFloat($('dpi1').value), sens = parseFloat($('sens1').value), r = $('r1');
    r.hidden = false;
    if (!(dpi > 0) || !(sens >= 0)) { r.textContent = 'Escribe números válidos en los dos campos.'; return; }
    escribir(r, ['Tu eDPI es ', { b: fmt(dpi * sens) }, ' (' + fmt(dpi) + ' DPI × ' + fmt(sens) + ' de sensibilidad).']);
  });

  $('b2').addEventListener('click', function () {
    var a = parseFloat($('dpi2a').value), s = parseFloat($('sens2a').value), b = parseFloat($('dpi2b').value), r = $('r2');
    r.hidden = false;
    if (!(a > 0) || !(s >= 0) || !(b > 0)) { r.textContent = 'Escribe números válidos en los tres campos.'; return; }
    escribir(r, ['Con ', { b: fmt(b) + ' DPI' }, ', pon una sensibilidad de ', { b: fmt(a * s / b) }, ' para mantener tu eDPI de ' + fmt(a * s) + '.']);
  });
})();
