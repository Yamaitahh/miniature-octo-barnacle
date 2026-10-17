/* PixelTrucos · calculadora de almacenamiento (todo en tu navegador) */
(function () {
  'use strict';
  var contenedor = document.getElementById('juegos');
  if (!contenedor) return;

  function crear(tag, atributos) {
    var el = document.createElement(tag);
    Object.keys(atributos || {}).forEach(function (k) { el.setAttribute(k, atributos[k]); });
    return el;
  }

  function anadirFila(nombre) {
    var fila = crear('div', { 'class': 'fila-juego' });
    var n = crear('input', { type: 'text', placeholder: 'Nombre del juego', 'class': 'nombre', maxlength: '60', 'aria-label': 'Nombre del juego' });
    var g = crear('input', { type: 'number', placeholder: 'GB', min: '0', step: '0.1', 'class': 'gb', inputmode: 'decimal', 'aria-label': 'Tamaño en GB' });
    var q = crear('button', { type: 'button', 'aria-label': 'Quitar juego' });
    q.textContent = '✕';
    n.value = nombre || '';
    q.addEventListener('click', function () { fila.remove(); });
    fila.appendChild(n); fila.appendChild(g); fila.appendChild(q);
    contenedor.appendChild(fila);
  }

  function escribir(el, partes) {
    el.textContent = '';
    partes.forEach(function (p) {
      if (p === '<br>') { el.appendChild(document.createElement('br')); return; }
      if (typeof p === 'string') { el.appendChild(document.createTextNode(p)); return; }
      var s = document.createElement('strong');
      s.textContent = p.b;
      el.appendChild(s);
    });
  }

  anadirFila('Fortnite');
  anadirFila('');

  document.getElementById('anadir').addEventListener('click', function () { anadirFila(''); });

  document.getElementById('calcular').addEventListener('click', function () {
    var disco = parseFloat(document.getElementById('disco').value) || 0;
    var sistema = parseFloat(document.getElementById('sistema').value) || 0;
    var juegos = 0;
    document.querySelectorAll('.gb').forEach(function (i) { juegos += parseFloat(i.value) || 0; });

    var usado = sistema + juegos;
    var libre = disco - usado;
    var porcentaje = disco > 0 ? Math.min(100, (usado / disco) * 100) : 0;

    var partes = ['Tus juegos ocupan ', { b: juegos.toFixed(1) + ' GB' }, '. '];
    if (libre >= 0) {
      partes.push('Te quedan libres ', { b: libre.toFixed(1) + ' GB' }, ' (' + (100 - porcentaje).toFixed(0) + '% del disco).');
      if (libre < disco * 0.1) {
        partes.push('<br>', '<br>', '⚠️ Te queda menos del 10% libre. Conviene borrar algo o ampliar el almacenamiento.');
      }
    } else {
      partes.push('Te faltan ', { b: Math.abs(libre).toFixed(1) + ' GB' }, '. No te caben todos los juegos.');
    }
    escribir(document.getElementById('texto'), partes);
    var barra = document.getElementById('progreso');
    barra.style.width = porcentaje + '%';
    barra.className = libre < disco * 0.1 ? 'lleno' : '';
    document.getElementById('resultado').hidden = false;
  });
})();
