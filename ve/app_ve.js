document.addEventListener('DOMContentLoaded', () => {
  const CONFIG = {
    EXCHANGE_RATE: 9999,      // 👈 pon aquí tu tasa: 1 BOB = X VES
    DISCOUNT: 0.10,           // 10% descuento (si aplica)
    MIN_AMOUNT: 10,
    MAX_AMOUNT: 50000,
    WHATSAPP_NUMBER: '591775333489'
  };

  const amountInput = document.getElementById('amount');
  const receivedInput = document.getElementById('received-amount');
  const resultCard = document.getElementById('result-card');
  const calculateBtn = document.getElementById('calculate-btn');
  const cotizDatetime = document.getElementById('cotiz-datetime');

  const now = new Date();
  cotizDatetime.textContent = now.toLocaleString('es-BO', {
    day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  [
    'calculator-card','feature1','feature2','feature3','feature4',
    'testimonial1','testimonial2','testimonial3'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  const formatVES = (n) => Number(n).toLocaleString('es-VE', { maximumFractionDigits: 0 });
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const computeVES = (bob) =>
    Math.round(bob * CONFIG.EXCHANGE_RATE * (1 - (Number(CONFIG.DISCOUNT) || 0)));

  function calculateTransfer() {
    const amount = parseFloat(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {
      receivedInput.value = '';
      resultCard.classList.remove('show');
      document.getElementById('result-amount').textContent = '0';
      return;
    }

    const safeAmount = clamp(amount, 0, CONFIG.MAX_AMOUNT);
    const receivedAmount = computeVES(safeAmount);

    receivedInput.value = formatVES(receivedAmount);
    document.getElementById('result-amount').textContent = formatVES(receivedAmount);
    resultCard.classList.add('show');
  }

  amountInput.addEventListener('input', calculateTransfer);

  calculateBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {
      calculateBtn.classList.add('error');
      calculateBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Monto inválido';
      setTimeout(() => {
        calculateBtn.classList.remove('error');
        calculateBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar dinero por WhatsApp';
      }, 1400);
      return;
    }

    if (amount < CONFIG.MIN_AMOUNT || amount > CONFIG.MAX_AMOUNT) {
      calculateBtn.classList.add('error');
      calculateBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Rango: ${CONFIG.MIN_AMOUNT}–${CONFIG.MAX_AMOUNT} BOB`;
      setTimeout(() => {
        calculateBtn.classList.remove('error');
        calculateBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar dinero por WhatsApp';
      }, 1600);
      return;
    }

    calculateBtn.classList.add('calculating');
    calculateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparando...';

    setTimeout(() => {
      const receivedAmount = computeVES(amount);
      const message =
        `Hola LUPO 👋\n` +
        `Quiero enviar *${amount} BOB* a Venezuela.\n` +
        `Recibe aprox: *${formatVES(receivedAmount)} VES*.\n` +
        `¿Me ayudan con el envío?`;

      const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      calculateBtn.classList.remove('calculating');
      calculateBtn.classList.add('success');
      calculateBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Listo!';

      setTimeout(() => {
        window.open(url, '_blank', 'noopener');
        setTimeout(() => {
          calculateBtn.classList.remove('success');
          calculateBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar dinero por WhatsApp';
        }, 1200);
      }, 450);
    }, 650);
  });

  if (amountInput.value) calculateTransfer();

  // PWA
  let deferredPrompt;
  const installBtn = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });

  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
  });

  // iOS modal
  const iosModal = document.getElementById('ios-modal');
  const iosClose = document.getElementById('ios-close');

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

  if (isIOS && isSafari && !isInStandaloneMode) iosModal.style.display = 'block';
  iosClose.addEventListener('click', () => { iosModal.style.display = 'none'; });
});
