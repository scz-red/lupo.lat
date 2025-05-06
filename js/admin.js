// js/admin.js
// Ubica este archivo en js/admin.js

// Lógica del panel de administración para Lupo

document.addEventListener('DOMContentLoaded', () => {
  const ADMIN_PASSWORD = 'GROMO';

  // Elementos del DOM
  const loginBox   = document.getElementById('loginContainer');
  const panel      = document.getElementById('adminPanel');
  const loginBtn   = document.getElementById('loginBtn');
  const logoutBtn  = document.getElementById('logoutBtn');
  const pwdInput   = document.getElementById('password');
  const errorText  = document.getElementById('errorText');
  const tabs       = document.querySelectorAll('.tab');
  const contents   = document.querySelectorAll('.tab-content');

  // Estado inicial de tasas
  let currentRates = {
    lupo:         13.5,
    westernUnion: 13.2,
    ria:          13.1,
    moneyGram:    13.3,
    lastUpdated:  new Date().toLocaleString()
  };

  // Función de login por click o Enter
  loginBtn.addEventListener('click', handleLogin);
  pwdInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });

  function handleLogin() {
    if (pwdInput.value.trim() === ADMIN_PASSWORD) {
      loginBox.classList.add('hidden');
      panel.classList.remove('hidden');
      loadRates();
    } else {
      errorText.textContent = 'Contraseña incorrecta';
    }
  }

  // Función de logout
  logoutBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
    loginBox.classList.remove('hidden');
    pwdInput.value = '';
    errorText.textContent = '';
  });

  // Navegación de pestañas
  tabs.forEach(tab =>
    tab.addEventListener('click', () => switchTab(tab.dataset.tab))
  );

  function switchTab(id) {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    document.querySelector(`.tab[data-tab="${id}"]`).classList.add('active');
    document.getElementById(id + 'Tab').classList.add('active');

    if (id === 'stats') updateStats();
    if (id === 'transactions') loadTransactions();
  }

  // Carga de tasas desde localStorage
  function loadRates() {
    const saved = JSON.parse(localStorage.getItem('lupo_rates')) || {};
    currentRates = { ...currentRates, ...saved };

    document.getElementById('lupoRate').value      = currentRates.lupo.toFixed(2);
    document.getElementById('wuRate').value        = currentRates.westernUnion.toFixed(2);
    document.getElementById('riaRate').value       = currentRates.ria.toFixed(2);
    document.getElementById('mgRate').value        = currentRates.moneyGram.toFixed(2);
    document.getElementById('lastUpdated').textContent = currentRates.lastUpdated;
  }

  // Guardar tasas y actualizar localStorage
  document.getElementById('saveBtn').addEventListener('click', () => {
    currentRates = {
      lupo:         parseFloat(document.getElementById('lupoRate').value)      || 0,
      westernUnion: parseFloat(document.getElementById('wuRate').value)        || 0,
      ria:          parseFloat(document.getElementById('riaRate').value)       || 0,
      moneyGram:    parseFloat(document.getElementById('mgRate').value)        || 0,
      lastUpdated:  new Date().toLocaleString()
    };
    localStorage.setItem('lupo_rates', JSON.stringify(currentRates));
    alert('¡Tasas guardadas correctamente!');
  });

  // Actualizar estadísticas en la pestaña
  function updateStats() {
    const maxComp = Math.max(
      currentRates.westernUnion,
      currentRates.ria,
      currentRates.moneyGram
    );

    const advantage = (currentRates.lupo - maxComp).toFixed(2);
    document.getElementById('currentRate').textContent   = currentRates.lupo.toFixed(2);
    document.getElementById('rateAdvantage').textContent = (advantage >= 0 ? '+' : '') + advantage;
  }

  // Cargar y mostrar historial de transacciones
  function loadTransactions() {
    const txs = JSON.parse(localStorage.getItem('lupo_transactions')) || [];
    const list = document.getElementById('transactionsList');

    list.innerHTML = txs.map(t =>
      `<div class="transaction-row">
         <span>${t.date}</span>
         <span>${t.amount} ${t.currency}</span>
         <span style="color:${t.status === 'Completado' ? '#25D366' : '#e67e22'}">
           ${t.status}
         </span>
       </div>`
    ).join('');

    document.getElementById('todayTransactions').textContent =
      txs.filter(t => t.status === 'Completado').length;
  }
});
