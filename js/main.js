function getUserLang() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith('it')) return 'it';
  return 'es';
}

function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.closest('.faq-answer')) {
      el.innerHTML = translations[lang][key] || '';
    } else {
      el.textContent = translations[lang][key] || '';
    }
  });
}

function randomKey(keysArray) {
  return keysArray[Math.floor(Math.random() * keysArray.length)];
}

window.addEventListener('DOMContentLoaded', () => {
  const lang = getUserLang();
  translatePage(lang);

  // Hero: mensaje aleatorio
  const heroTitle = document.querySelector('[data-i18n^="hero-title"]');
  if (heroTitle && typeof heroPhraseKeys !== 'undefined') {
    const key = randomKey(heroPhraseKeys);
    heroTitle.textContent = translations[lang][key];
  }

  // Calculadora: título aleatorio
  const calcTitle = document.querySelector('[data-i18n^="calc-title"]');
  if (calcTitle && typeof calcPhraseKeys !== 'undefined') {
    const key = randomKey(calcPhraseKeys);
    calcTitle.textContent = translations[lang][key];
  }

  // Placeholder calculadora
  const inputAmount = document.getElementById('amount');
  if (inputAmount) inputAmount.placeholder = translations[lang]["calc-placeholder"];

  // Lógica de la calculadora
  const rates = { lupo:13.6, ria:13.1, wu:12.90, mg:13.50 };
  const totalLupo = document.getElementById('total-lupo');
  const totalRia = document.getElementById('total-ria');
  const totalWu = document.getElementById('total-wu');
  const totalMg = document.getElementById('total-mg');
  const saveEl = document.getElementById('save');
  const btn = document.getElementById('whatsapp');
  if (inputAmount) {
    inputAmount.addEventListener('input', () => {
      const v = parseFloat(inputAmount.value) || 0;
      const l = v * rates.lupo;
      const r = v * rates.ria;
      const w = v * rates.wu;
      const m = v * rates.mg;

      if (totalLupo) totalLupo.textContent = `${l.toFixed(2)} Bs`;
      if (totalRia) totalRia.textContent = `${r.toFixed(2)} Bs`;
      if (totalWu) totalWu.textContent = `${w.toFixed(2)} Bs`;
      if (totalMg) totalMg.textContent = `${m.toFixed(2)} Bs`;

      const minComp = Math.max(r, w, m);
      const savings = l - minComp;

      // Mensaje de ahorro aleatorio (cifra resaltada)
      if (typeof savePhraseKeys !== 'undefined') {
        const saveKey = randomKey(savePhraseKeys);
        const msg = translations[lang][saveKey].replace(
          "{{save}}",
          `<span style="font-weight:bold;text-decoration:underline;">${savings.toFixed(2)} Bs</span>`
        );
        if (saveEl) saveEl.innerHTML = msg;
      }

      if (l > 0 && btn) {
        btn.textContent = (translations[lang]["calc-btn"] || "Enviar") + ` ${l.toFixed(2)}`;
        btn.style.display = 'block';
        btn.onclick = () => {
          window.location.href = `https://wa.me/393341950037?text=${encodeURIComponent(
            `Hola Lupo, Quisiera enviar ${v}€ a Bolivia. Que  reciban ${l.toFixed(2)} Bs`
          )}`;
        };
      } else if (btn) {
        btn.style.display = 'none';
      }
    });
  }
  // Inicializa la fecha y hora en la calculadora
  const fechaEl = document.getElementById('calc-datetime');
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

