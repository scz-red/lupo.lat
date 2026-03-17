// app.js - VERSIÓN SIMPLE Y FUNCIONAL

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 LUPO App iniciada');
    
    // 1. ACTIVAR CALCULADORA
    if (typeof iniciarCalculadora === 'function') {
        iniciarCalculadora();
    }
    
    // 2. ACTIVAR CARRUSEL
    if (typeof iniciarCarrusel === 'function') {
        iniciarCarrusel();
    }
    
    // 3. CONFIGURAR BOTÓN PWA
    const installBtn = document.getElementById('install-btn');
    const iosModal = document.getElementById('ios-modal');
    const iosClose = document.getElementById('ios-close');
    
    if (installBtn) {
        installBtn.addEventListener('click', () => {
            if (iosModal) iosModal.style.display = 'block';
        });
    }
    
    if (iosClose) {
        iosClose.addEventListener('click', () => {
            iosModal.style.display = 'none';
        });
    }
});
