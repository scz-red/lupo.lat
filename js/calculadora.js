// calculadora.js
// ============================================
// CONFIGURACIÓN + LÓGICA EN UN SOLO ARCHIVO
// ============================================

// ===== CONFIGURACIÓN - EDITA SOLO ESTO =====
const TIPO_CAMBIO_BASE = 10.61;   // 1 EUR = 10.61 BOB
const DESCUENTO = 0.09;           // 9% de descuento
const TELEFONO_WHATSAPP = '59171077231';
// ============================================

// Tasa final
const TASA_FINAL = TIPO_CAMBIO_BASE * (1 - DESCUENTO);

document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('amount');
  const receivedInput = document.getElementById('received-amount');
  const resultSpan = document.getElementById('result-amount');
  const datetimeSpan = document.getElementById('cotiz-datetime');
  const whatsappBtn = document.getElementById('calculate-btn');

  if (!amountInput || !receivedInput || !resultSpan || !whatsappBtn) {
    console.error('No se encontraron los elementos de la calculadora');
    return;
  }

  function formatNumber(num) {
    return new Intl.NumberFormat('es-BO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function calculate() {
    const rawValue = amountInput.value.replace(',', '.');
    const amount = parseFloat(rawValue) || 0;

    const bobValue = amount * TASA_FINAL;
    const formattedValue = formatNumber(bobValue);

    receivedInput.value = formattedValue;
    resultSpan.textContent = bobValue.toFixed(2);

    return { amount, bobValue };
  }

  function sendWhatsApp() {
    const { amount, bobValue } = calculate();

    const euroText = amount === 1 ? 'euro' : 'euros';

    const message =
`Hola LUPO 👋
Quiero enviar *${amount} ${euroText}* a Bolivia.
Reciben aprox: *${formatNumber(bobValue)} Bs*.

¿Me podrían indicar cómo proceder para realizar el envío?`;

    const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  function updateDateTime() {
    if (!datetimeSpan) return;

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    datetimeSpan.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;
  }

  amountInput.addEventListener('input', function () {
    calculate();
  });

  amountInput.addEventListener('blur', function () {
    if (!amountInput.value || parseFloat(amountInput.value) === 0) {
      amountInput.value = '100';
      calculate();
    }
  });

  whatsappBtn.addEventListener('click', sendWhatsApp);

  if (!amountInput.value) {
    amountInput.value = '100';
  }

  calculate();
  updateDateTime();
  setInterval(updateDateTime, 60000);
});
