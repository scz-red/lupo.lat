// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Referencias al DOM
  const eurInput            = document.getElementById('eurInput');
  const sendCurrencySelect  = document.getElementById('sendCurrency');
  const localInput          = document.getElementById('localInput');
  const destinationSelect   = document.getElementById('destination');
  const destFlag            = document.getElementById('destFlag');
  const whatsappBtn         = document.getElementById('whatsappBtn');
  const mgReceivedSpan      = document.getElementById('mgReceived');
  const wuReceivedSpan      = document.getElementById('wuReceived');
  const riaReceivedSpan     = document.getElementById('riaReceived');

  // Tasas de cambio (carga desde localStorage o valores por defecto)
  const rates = {
    bolivia: parseFloat(localStorage.getItem('rateBolivia')) || 13.5,
    colombia: parseFloat(localStorage.getItem('rateColombia')) || 4150
  };
  const compRates = {
    bolivia: {
      mg: parseFloat(localStorage.getItem('mgBolivia')) || 13.3,
      wu: parseFloat(localStorage.getItem('wuBolivia')) || 13.2,
      ria: parseFloat(localStorage.getItem('riaBolivia')) || 13.1
    },
    colombia: {
      mg: parseFloat(localStorage.getItem('mgColombia')) || 4100,
      wu: parseFloat(localStorage.getItem('wuColombia')) || 4080,
      ria: parseFloat(localStorage.getItem('riaColombia')) || 4050
    }
  };

  function calculate() {
    const amount      = parseFloat(eurInput.value) || 0;
    const currency    = sendCurrencySelect.value;         // 'EUR'
    const destination = destinationSelect.value;           // 'bolivia' | 'colombia'
    const rate        = rates[destination] || 0;
    const received    = amount * rate;

    // 1) Mostrar resultado en localInput con 2 decimales
    localInput.value = received.toFixed(2);

    // 2) Cambiar bandera de destino
    if (destination === 'bolivia') {
      destFlag.src = 'https://flagcdn.com/w40/bo.png';
      destFlag.alt = 'BOB';
    } else {
      destFlag.src = 'https://flagcdn.com/w40/co.png';
      destFlag.alt = 'COP';
    }

    // 3) Mostrar comparación de comisiones
    mgReceivedSpan.textContent  = (amount * compRates[destination].mg).toFixed(2);
    wuReceivedSpan.textContent  = (amount * compRates[destination].wu).toFixed(2);
    riaReceivedSpan.textContent = (amount * compRates[destination].ria).toFixed(2);

    // 4) Construir mensaje y actualizar enlace de WhatsApp
    const toCurrency = destination === 'bolivia' ? 'BOB' : 'COP';
    const msg = `¡Hola Lupo! Quisiera enviar ${amount.toFixed(2)} ${currency} a ${
      destination === 'bolivia' ? 'Bolivia' : 'Colombia'
    }, que serían ${received.toFixed(2)} ${toCurrency}.`;
    whatsappBtn.href = `https://wa.me/5913341950037?text=${encodeURIComponent(msg)}`;
  }

  // Listeners para disparar cálculo en tiempo real
  eurInput.addEventListener('input', calculate);
  destinationSelect.addEventListener('change', calculate);
  sendCurrencySelect.addEventListener('change', calculate);

  // Cálculo inicial
  calculate();
});
