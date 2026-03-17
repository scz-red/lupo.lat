// calculator-logic.js
// ============================================
// LÓGICA DE LA CALCULADORA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 Inicializando calculadora LUPO...');
    
    // ===== CONFIGURACIÓN =====
    const config = window.CALCULATOR_CONFIG || {
        baseRate: 10.61,
        discount: 0.09
    };
    
    // Calcular tasa final de LUPO (con descuento aplicado)
    const LUPO_RATE = config.baseRate * (1 - config.discount);
    
    // ===== ELEMENTOS DEL DOM =====
    const amountInput = document.getElementById('amount');
    const receivedInput = document.getElementById('received-amount');
    const resultSpan = document.getElementById('result-amount');
    const datetimeSpan = document.getElementById('cotiz-datetime');
    const whatsappBtn = document.getElementById('calculate-btn');
    
    // Verificar que los elementos existen
    if (!amountInput || !receivedInput || !resultSpan || !whatsappBtn) {
        console.error('❌ Error: No se encontraron los elementos de la calculadora');
        return;
    }
    
    // ===== FUNCIÓN DE FORMATO =====
    function formatNumber(num) {
        return new Intl.NumberFormat('es-BO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }
    
    // ===== FUNCIÓN PRINCIPAL DE CÁLCULO =====
    function calculate() {
        // Obtener valor del input
        let rawValue = amountInput.value.replace(',', '.');
        const amount = parseFloat(rawValue) || 0;
        
        // Calcular valor en bolivianos
        const bobValue = amount * LUPO_RATE;
        const formattedValue = formatNumber(bobValue);
        
        // Actualizar campos
        receivedInput.value = formattedValue;
        resultSpan.textContent = bobValue.toFixed(2);
        
        return { amount, bobValue };
    }
    
    // ===== CONFIGURAR BOTÓN WHATSAPP =====
    function setupWhatsApp(amount, bobValue) {
        whatsappBtn.onclick = function() {
            const message = `Hola LUPO! Quisiera enviar €${amount} a Bolivia. Con tu tasa recibo ${formatNumber(bobValue)} Bs.`;
            const phoneNumber = '59171077231';
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        };
    }
    
    // ===== ACTUALIZAR FECHA Y HORA =====
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
    
    // ===== EVENT LISTENERS =====
    amountInput.addEventListener('input', function() {
        const { amount, bobValue } = calculate();
        setupWhatsApp(amount, bobValue);
    });
    
    amountInput.addEventListener('blur', function() {
        if (!amountInput.value || parseFloat(amountInput.value) === 0) {
            amountInput.value = '100';
            calculate();
        }
    });
    
    // ===== INICIALIZACIÓN =====
    // Asegurar que el input tenga un valor
    if (!amountInput.value) {
        amountInput.value = '100';
    }
    
    const { amount, bobValue } = calculate();
    setupWhatsApp(amount, bobValue);
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    console.log('✅ Calculadora funcionando correctamente');
});
