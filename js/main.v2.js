
document.addEventListener("DOMContentLoaded", function () {
  const eurInput = document.getElementById("eurInput");
  const bobInput = document.getElementById("bobInput");
  const rate = 16.22;
  const button = document.getElementById("sendButton");
  const rateText = document.getElementById("rate");
  const liveTimestamp = document.getElementById("liveTimestamp");

  function updateTimestamp() {
    const date = new Date();
    liveTimestamp.textContent = date.toLocaleString('es-BO', { dateStyle: 'short', timeStyle: 'short' });
  }

  updateTimestamp();
  setInterval(updateTimestamp, 60000);

  eurInput.addEventListener("input", () => {
    const eur = parseFloat(eurInput.value);
    if (!isNaN(eur) && eur > 0) {
      const bob = (eur * rate).toFixed(2);
      bobInput.value = bob;
      button.innerHTML = "Enviar dinero 🇧🇴";
      button.disabled = false;
    } else {
      bobInput.value = "";
      button.innerText = "Calcular";
      button.disabled = true;
    }
  });
});
