
document.addEventListener('DOMContentLoaded', () => {
  const eurInput = document.getElementById('eurInput');
  const localOutput = document.getElementById('localInput');
  const mgOutput = document.getElementById('mgReceived');
  const wuOutput = document.getElementById('wuReceived');
  const riaOutput = document.getElementById('riaReceived');
  const destSelect = document.getElementById('destination');
  const flagImg = document.getElementById('destFlag');
  const whatsappLink = document.getElementById('whatsappBtn');
  const waNumber = '393341950037';

  let rates = { lupo: 16.22, moneyGram: 13.7, westernUnion: 12.8, ria: 14.1 };

  function update() {
    const amount = parseFloat(eurInput.value) || 0;
    const dest = destSelect.value;
    let local = amount * rates.lupo;
    localOutput.value = local.toFixed(2);
    mgOutput.textContent = `😟 ${(amount * rates.moneyGram).toFixed(1)} Bs.`;
    wuOutput.textContent = `😟 ${(amount * rates.westernUnion).toFixed(1)} Bs.`;
    riaOutput.textContent = `😟 ${(amount * rates.ria).toFixed(1)} Bs.`;
    const msg = `🇧🇴 ¡Hola Lupo! Quiero enviar ${amount.toFixed(2)} EUR a Bolivia. El destinatario recibirá ${local.toFixed(2)} BOB.`;
    whatsappLink.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  }

  eurInput.addEventListener('input', update);
  destSelect.addEventListener('change', update);
  update();
});
