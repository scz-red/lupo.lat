document.addEventListener('DOMContentLoaded', () => {
  const eurInput     = document.getElementById('eurInput');
  const localOutput  = document.getElementById('localInput');
  const mgOutput     = document.getElementById('mgReceived');
  const wuOutput     = document.getElementById('wuReceived');
  const riaOutput    = document.getElementById('riaReceived');
  const destSelect   = document.getElementById('destination');
  const flagImg      = document.getElementById('destFlag');
  const whatsappLink = document.getElementById('whatsappBtn');
  const waNumber     = '393341950037'; // WhatsApp LUPO

  if (!eurInput || !localOutput || !mgOutput || !wuOutput || !riaOutput ||
      !destSelect || !flagImg || !whatsappLink) {
    console.error('main.js: Faltan elementos HTML – revisa los IDs.'); 
    return;
  }

  let rates = {
    lupo: 16.17,
    westernUnion: 12.70,
    ria: 14.1,
    moneyGram: 13.12
  };

  function calculate() {
    const amount = parseFloat(eurInput.value) || 0;
    const dest   = destSelect.value;
    let local, mg, wu, ria, msg;

    if (dest === 'bolivia') {
      local = amount * rates.lupo;
      mg    = amount * rates.moneyGram;
      wu    = amount * rates.westernUnion;
      ria   = amount * rates.ria;
      flagImg.src = 'https://flagcdn.com/w40/bo.png';
      flagImg.alt = 'Bandera de Bolivia';
      msg = `¡Hola Lupo! Quisiera Envíar ${amount.toFixed(2)} EUR a Bolivia. Para entregar  ${local.toFixed(2)} BOB.`;
    } else {
      const copRate = parseFloat(localStorage.getItem('rateColombia')) || 4150;
      local = amount * copRate;
      mg = wu = ria = 0.0;
      flagImg.src = 'https://flagcdn.com/w40/co.png';
      flagImg.alt = 'Bandera de Colombia';
      msg = `¡Hola Lupo! Quiero Envíar ${amount.toFixed(2)} EUR a Colombia. Recibirá ${local.toFixed(2)} COP.`;
    }

    localOutput.value     = local.toFixed(2);
    mgOutput.textContent  = `${mg.toFixed(1)} Bs.`;
    wuOutput.textContent  = `${wu.toFixed(1)} Bs.`;
    riaOutput.textContent = `${ria.toFixed(1)} Bs.`;
    whatsappLink.href     = `https://wa.me/${waNumber}?text=` + encodeURIComponent(msg);
  }

  fetch('php/leer_tasas.php')
    .then(response => response.json())
    .then(data => {
      rates = {
        lupo: parseFloat(data.lupo),
        westernUnion: parseFloat(data.westernUnion),
        ria: parseFloat(data.ria),
        moneyGram: parseFloat(data.moneyGram)
      };
      calculate();
    })
    .catch(error => {
      console.error('No se pudo cargar tasas. Usando valores por defecto.', error);
      calculate();
    });

  eurInput.addEventListener('input', calculate);
  destSelect.addEventListener('change', calculate);

  const carousel = document.getElementById('partnersCarousel');
  if (carousel) {
    const speed = 0.5;
    let pos = 0;

    function scrollLoop() {
      pos += speed;
      if (pos >= carousel.scrollWidth - carousel.clientWidth) pos = 0;
      carousel.scrollLeft = pos;
      requestAnimationFrame(scrollLoop);
    }

    requestAnimationFrame(scrollLoop);
  }
});
