// ============================================
// calculadora.js - ÚNICO ARCHIVO
// ============================================
// Aquí controlas TODO:
// - Tipo de cambio
// - Porcentaje de descuento
// - Lógica de la calculadora
// ============================================

// ===== CONFIGURACIÓN - EDITA SOLO ESTO =====
const TIPO_CAMBIO_BASE = 10.61;  // 1 EUR = 10.61 BOB
const DESCUENTO = 0.09;           // 9% de descuento
// ============================================

// Calcular tasa final
const TASA_FINAL = TIPO_CAMBIO_BASE * (1 - DESCUENTO);

console.log('⚙️ Calculadora configurada:');
console.log(`💰 Tasa base: ${TIPO_CAMBIO_BASE} Bs/€`);
console.log(`📉 Descuento: ${DESCUENTO * 100}%`);
console.log(`💵 Tasa final: ${TASA_FINAL.toFixed(2)} Bs/€`);

// ===== LÓGICA DE LA CALCULADORA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 Inicializando calculadora...');
    
    // Elementos del DOM
    const amountInput = document.getElementById('amount');
    const receivedInput = document.getElementById('received-amount');
    const resultSpan = document.getElementById('result-amount');
    const datetimeSpan = document.getElementById('cotiz-datetime');
    const whatsappBtn = document.getElementById('calculate-btn');
    
    // Verificar elementos
    if (!amountInput || !receivedInput || !resultSpan || !whatsappBtn) {
        console.error('❌ Error: No se encontraron elementos de la calculadora');
        return;
    }
    
    // Formatear números
    function formatNumber(num) {
        return new Intl.NumberFormat('es-BO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }
    
    // Calcular
    function calculate() {
        let rawValue = amountInput.value.replace(',', '.');
        const amount = parseFloat(rawValue) || 0;
        
        const bobValue = amount * TASA_FINAL;
        const formattedValue = formatNumber(bobValue);
        
        receivedInput.value = formattedValue;
        resultSpan.textContent = bobValue.toFixed(2);
        
        return { amount, bobValue };
    }
    
    // WhatsApp
    function setupWhatsApp(amount, bobValue) {
        whatsappBtn.onclick = function() {
            const message = `Hola LUPO! Quisiera enviar €${amount} a Bolivia. Con tu tasa recibo ${formatNumber(bobValue)} Bs.`;
            const phoneNumber = '59171077231';
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        };
    }
    
    // Fecha y hora
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
    
    // Event listeners
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
    
    // Inicializar
    if (!amountInput.value) {
        amountInput.value = '100';
    }
    
    const { amount, bobValue } = calculate();
    setupWhatsApp(amount, bobValue);
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    console.log('✅ Calculadora lista');
});
