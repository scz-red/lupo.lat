document.addEventListener('DOMContentLoaded', () => {
  // Carga de tasas (localStorage o default)
  const rates = {
    bolivia: parseFloat(localStorage.getItem('rateBolivia')) || 13.5,
    colombia: parseFloat(localStorage.getItem('rateColombia')) || 4150
  };
  const comp = {
    bolivia: {
      moneyGram: parseFloat(localStorage.getItem('mgBolivia')) || 13.3,
      westernUnion: parseFloat(localStorage.getItem('wuBolivia')) || 13.2,
      ria: parseFloat(localStorage.getItem('riaBolivia')) || 13.1
    },
    colombia: {
      moneyGram: parseFloat(localStorage.getItem('mgColombia')) || 4100,
      westernUnion: parseFloat(localStorage.getItem('wuColombia')) || 4080,
      ria: parseFloat(localStorage.getItem('riaColombia')) || 4050
    }
  };

  // Toggle menú móvil
  document.getElementById('menuToggle').addEventListener('click', () =>
    document.getElementById('navLinks').classList.toggle('active')
  );

  // Carousel de logos automático
  const carousel = document.getElementById('partnersCarousel');
  if (carousel) {
    setInterval(() => {
      // Solo si el contenido desborda
      if (carousel.scrollWidth > carousel.clientWidth) {
        carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
        // Si llegamos al final, resetea
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          setTimeout(() => carousel.scrollTo({ left: 0, behavior: 'smooth' }), 500);
        }
      }
    }, 3000);
  }

  // Función principal de calculadora + WhatsApp
  function calculateAll() {
    const amount = parseFloat(document.getElementById('eurInput').value) || 0;
    const dest = document.getElementById('destination').value;
    const rate = rates[dest];
    const received = amount * rate;

    // Actualiza UI
    document.getElementById('localInput').value = received.toFixed(2);
    document.getElementById('destFlag').src =
      `https://flagcdn.com/w40/${dest === 'bolivia' ? 'bo' : 'co'}.png`;
    const { moneyGram, westernUnion, ria } = comp[dest];
    document.getElementById('mgReceived').textContent = (amount * moneyGram).toFixed(2);
    document.getElementById('wuReceived').textContent = (amount * westernUnion).toFixed(2);
    document.getElementById('riaReceived').textContent = (amount * ria).toFixed(2);

    // Genera mensaje WhatsApp
    const formattedAmount   = amount.toFixed(2);
    const formattedReceived = received.toFixed(2);
    const message = 
      `¡Hola Lupo! Quisiera enviar *${formattedAmount} EUR* a Bolivia, que serían *${formattedReceived} ${dest.toUpperCase()}*.`;
    document.getElementById('whatsappBtn').href =
      `https://wa.me/393341950037?text=${encodeURIComponent(message)}`;
  }

  // Eventos
  document.getElementById('eurInput').addEventListener('input', calculateAll);
  document.getElementById('destination').addEventListener('change', calculateAll);
  calculateAll();
});
