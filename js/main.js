// js/main.js
// Este archivo conecta las tasas del admin (almacenadas en localStorage bajo "lupo_rates")
// con la calculadora de tu página pública y usa el número italiano en WhatsApp

document.addEventListener('DOMContentLoaded', () => {
  // --- 1) Lectura de tasas del admin o valores por defecto ---
  const saved = JSON.parse(localStorage.getItem('lupo_rates')) || {};
  const rates = {
    lupo:         saved.lupo         != null ? saved.lupo         : 13.50,
    westernUnion: saved.westernUnion != null ? saved.westernUnion : 13.20,
    ria:          saved.ria          != null ? saved.ria          : 13.10,
    moneyGram:    saved.moneyGram    != null ? saved.moneyGram    : 13.30
  };

  // --- 2) Referencias al DOM ---
  const eurInput        = document.getElementById('eurInput');
  const localOutput     = document.getElementById('localInput');
  const mgOutput        = document.getElementById('mgReceived');
  const wuOutput        = document.getElementById('wuReceived');
  const riaOutput       = document.getElementById('riaReceived');
  const destSelect      = document.getElementById('destination');
  const flagImg         = document.getElementById('destFlag');
  const whatsappLink    = document.getElementById('whatsappBtn');

  if (!eurInput || !localOutput || !mgOutput || !wuOutput || !riaOutput || !destSelect || !flagImg || !whatsappLink) {
    console.error('Faltan elementos HTML en main.js – revisa los IDs.');
    return;
  }

  // --- 3) Función de cálculo ---
  function calculate() {
    const amount = parseFloat(eurInput.value) || 0;
    const dest   = destSelect.value; // 'bolivia' o 'colombia'

    let local, mg, wu, ria, msg;

    if (dest === 'bolivia') {
      local = amount * rates.lupo;
      mg    = amount * rates.moneyGram;
      wu    = amount * rates.westernUnion;
      ria   = amount * rates.ria;
      flagImg.src = 'https://flagcdn.com/w40/bo.png';
      flagImg.alt = 'Bandera de Bolivia';
      msg = `¡Hola Lupo! Envío ${amount.toFixed(2)} EUR a Bolivia. Recibirá ${local.toFixed(2)} BOB.`;
    } else {
      const copRate = parseFloat(localStorage.getItem('rateColombia')) || 4150;
      local = amount * copRate;
      mg    = wu = ria = 0.0;
      flagImg.src = 'https://flagcdn.com/w40/co.png';
      flagImg.alt = 'Bandera de Colombia';
      msg = `¡Hola Lupo! Envío ${amount.toFixed(2)} EUR a Colombia. Recibirá ${local.toFixed(2)} COP.`;
    }

    // Actualizar la UI
    localOutput.value     = local.toFixed(2);
    mgOutput.textContent  = mg.toFixed(1);
    wuOutput.textContent  = wu.toFixed(1);
    riaOutput.textContent = ria.toFixed(1);

    // Enlace de WhatsApp con número italiano
    whatsappLink.href =
      `https://wa.me/393341950037?text=` + encodeURIComponent(msg);
  }

  // --- 4) Listeners para recalcular ---
  eurInput.addEventListener('input', calculate);
  destSelect.addEventListener('change', calculate);

  // --- 5) Inicializar cálculo al cargar ---
  calculate();
});
