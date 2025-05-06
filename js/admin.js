// js/admin.js
const ADMIN_PASSWORD = 'lupoAdmin2025';
const loginBox = document.getElementById('loginBox');
const adminPanel = document.getElementById('adminPanel');

// Login
document.getElementById('loginBtn').addEventListener('click', () => {
  if (document.getElementById('password').value === ADMIN_PASSWORD) {
    loginBox.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    loadRates();
  } else {
    alert('Contraseña incorrecta.');
  }
});

// Cargar tasas existentes
function loadRates() {
  [
    'rateBolivia','rateColombia',
    'mgBolivia','wuBolivia','riaBolivia',
    'mgColombia','wuColombia','riaColombia'
  ].forEach(id => {
    document.getElementById(id).value = localStorage.getItem(id) || '';
  });
}

// Guardar cambios
document.getElementById('saveBtn').addEventListener('click', () => {
  [
    'rateBolivia','rateColombia',
    'mgBolivia','wuBolivia','riaBolivia',
    'mgColombia','wuColombia','riaColombia'
  ].forEach(id => {
    localStorage.setItem(id, document.getElementById(id).value);
  });
  alert('Tasas guardadas correctamente.');
});
