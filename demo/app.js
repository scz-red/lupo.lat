// Elementos del DOM
const amountInput = document.getElementById('amount');
const receivedInput = document.getElementById('received-amount');
const calculateBtn = document.getElementById('calculate-btn');
const resultCard = document.getElementById('result-card');
const resultAmount = document.getElementById('result-amount');
const datetimeSpan = document.getElementById('cotiz-datetime');

// Tasa de cambio fija (ejemplo: 1 EUR = 7.80 BOB)
// En producción, esto vendría de una API
const EXCHANGE_RATE = 7.80;

// Mostrar fecha y hora actual
function updateDateTime() {
  const now = new Date();
  const options = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  };
  datetimeSpan.textContent = now.toLocaleDateString('es-ES', options);
}
updateDateTime();

// Calcular y mostrar resultado
function calculate() {
  const amount = parseFloat(amountInput.value);
  
  if (isNaN(amount) || amount <= 0) {
    receivedInput.value = '';
    resultCard.classList.remove('show');
    return;
  }
  
  const received = (amount * EXCHANGE_RATE).toFixed(2);
  receivedInput.value = `${received}`;
  resultAmount.textContent = new Intl.NumberFormat('es-BO').format(received);
  resultCard.classList.add('show');
}

// Escuchar cambios en el input
amountInput.addEventListener('input', calculate);

// Botón de WhatsApp
calculateBtn.addEventListener('click', () => {
  const amount = amountInput.value;
  
  if (!amount || amount <= 0) {
    alert('Por favor, ingresa un monto válido');
    return;
  }
  
  const received = (amount * EXCHANGE_RATE).toFixed(2);
  const message = `Hola! Quiero enviar €${amount} a Bolivia. ¿Me ayudas? Recibiría Bs ${received} con la tasa actual.`;
  const whatsappUrl = `https://wa.me/59171077231?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// Animación de entrada
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('calculator-card').classList.add('visible');
  }, 100);
  
  // Animación para features y testimonios
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.feature-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
});
