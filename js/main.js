function getUserLang() {
  const raw = (navigator.language || navigator.userLanguage || "es").toLowerCase();
  if (raw.startsWith("it")) return "it";
  return "es";
}

const lang = getUserLang();

function getTranslation(key) {
  if (
    typeof translations !== "undefined" &&
    translations[lang] &&
    translations[lang][key]
  ) {
    return translations[lang][key];
  }
  // fallback español si la clave no existe
  if (translations["es"] && translations["es"][key]) {
    return translations["es"][key];
  }
  // fallback clave literal
  return key;
}

function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.closest('.faq-answer')) {
      el.innerHTML = getTranslation(key);
    } else {
      el.textContent = getTranslation(key);
    }
  });
}

function randomKey(keysArray) {
  return keysArray[Math.floor(Math.random() * keysArray.length)];
}

window.addEventListener('DOMContentLoaded', () => {
  translatePage(lang);

  // Hero: mensaje aleatorio
  const heroTitle = document.querySelector('[data-i18n^="hero-title"]');
  if (heroTitle && typeof heroPhraseKeys !== 'undefined') {
    const key = randomKey(heroPhraseKeys);
    heroTitle.textContent = getTranslation(key);
  }

  // Calculadora: título aleatorio
  const calcTitle = document.querySelector('[data-i18n^="calc-title"]');
  if (calcTitle && typeof calcPhraseKeys !== 'undefined') {
    const key = randomKey(calcPhraseKeys);
    calcTitle.textContent = getTranslation(key);
  }

  // Placeholder calculadora
  const inputAmount = document.getElementById('amount');
  if (inputAmount) inputAmount.placeholder = getTranslation("calc-placeholder");

  // Elementos DOM
  const totalLupo = document.getElementById('total-lupo');
  const totalRia  = document.getElementById('total-ria');
  const totalWu   = document.getElementById('total-wu');
  const totalMg   = document.getElementById('total-mg');
  const saveEl    = document.getElementById('save');
  const btn       = document.getElementById('whatsapp');
  const rateEl    = document.getElementById('rate');
  const fechaEl   = document.getElementById('calc-datetime');

  // ====== CONFIGURACIÓN SIN API ======
  // Tasa base de euro (Bs por 1 EUR)
  const BASE_EUR_BS = 14.4;   // ← lo que pediste
  // Descuento/margen (10%)
  const FRONTEND_DISCOUNT = 0.10;
  const MULT = 1 - FRONTEND_DISCOUNT; // 0.90
  // Tasa neta que se usa para calcular y mostrar (como hacía tu app: tasa con descuento)
  const EURO_BS_LUPO = BASE_EUR_BS * MULT; // 14.8 * 0.90 = 13.32

  // Si quieres que 14.8 ya sea la tasa "neto" mostrada y usada, comenta la línea de arriba
  // y usa esta en su lugar:
  // const EURO_BS_LUPO = 14.8;

  // Tasas fijas para la competencia (igual que tu archivo)
  const rates = { ria: 12.8, wu: 12.60, mg: 13 };

  function actualizarCalculadora() {
    // Mostrar la tasa neta (antes mostrabas la tasa tras aplicar descuento)
    if (rateEl) rateEl.textContent = EURO_BS_LUPO.toFixed(2);

    const v = parseFloat((inputAmount?.value || '0').replace(',', '.')) || 0;

    const l = v * EURO_BS_LUPO; // Lupo (neto)
    const r = v * rates.ria;
    const w = v * rates.wu;
    const m = v * rates.mg;

    if (totalLupo) totalLupo.textContent = `${l.toFixed(2)} Bs`;
    if (totalRia)  totalRia.textContent  = `${r.toFixed(2)} Bs`;
    if (totalWu)   totalWu.textContent   = `${w.toFixed(2)} Bs`;
    if (totalMg)   totalMg.textContent   = `${m.toFixed(2)} Bs`;

    const maxComp = Math.max(r, w, m);
    const savings = l - maxComp;

    // Mensaje de ahorro aleatorio (cifra resaltada)
    if (typeof savePhraseKeys !== 'undefined') {
      const saveKey = randomKey(savePhraseKeys);
      const msg = getTranslation(saveKey).replace(
        "{{save}}",
        `<span style="font-weight:bold;text-decoration:underline;">${savings.toFixed(2)} Bs</span>`
      );
      if (saveEl) saveEl.innerHTML = msg;
    } else if (saveEl) {
      saveEl.textContent = `${savings.toFixed(2)} Bs`;
    }

    // Botón WhatsApp
    if (l > 0 && btn) {
      btn.textContent = (getTranslation("calc-btn") || "Enviar") + ` ${l.toFixed(2)}`;
      btn.style.display = 'block';
      btn.onclick = () => {
        window.location.href = `https://wa.me/393341950037?text=${encodeURIComponent(
          `Hola Lupo, Quisiera enviar ${v}€ a Bolivia. Que reciban ${l.toFixed(2)} Bs`
        )}`;
      };
    } else if (btn) {
      btn.style.display = 'none';
    }
  }

  if (inputAmount) inputAmount.addEventListener('input', actualizarCalculadora);

  // Primera carga de calculadora y rate
  actualizarCalculadora();

  // Fecha y hora de la cotización
  function setFecha() {
    const now = new Date();
    let h = now.getHours().toString().padStart(2, '0');
    let m = now.getMinutes().toString().padStart(2, '0');
    let d = now.getDate();
    let mo = now.getMonth() + 1;
    let y = now.getFullYear();
    if (fechaEl) fechaEl.textContent = `${h}:${m} ${d}/${mo}/${y}`;
  }
  setFecha();
  setInterval(setFecha, 60000);

  // FAQ acordeón
  document.querySelectorAll('.faq-question').forEach(function (el) {
    el.addEventListener('click', function () {
      document.querySelectorAll('.faq-item').forEach(function (item) {
        if (item !== el.parentElement) {
          item.classList.remove('active');
        }
      });
      el.parentElement.classList.toggle('active');
    });
  });
});

