// calculator-logic.js
// ============================================
// LÓGICA DE LA CALCULADORA - SIMPLE Y LIMPIA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 Inicializando calculadora LUPO...');
    
    // ===== CONFIGURACIÓN =====
    // Usar valores de config.js o valores por defecto
    const config = window.CALCULATOR_CONFIG || {
        baseRate: 10.61,
        discount: 0.09
    };
    
    // Calcular tasa final de LUPO (con descuento aplicado)
    const LUPO_RATE = config.baseRate * (1 - config.discount);
    console.log(`📊 Tasa LUPO: ${LUPO_RATE.toFixed(2)} Bs/€ (${config.discount * 100}% descuento)`);
    
    // ===== ELEMENTOS DEL DOM =====
    const amountInput = document.getElementById('amount');
    const receivedInput = document.getElementById('received-amount');
    const resultSpan = document.getElementById('result-amount');
    const datetimeSpan = document.getElementById('cotiz-datetime');
    const whatsappBtn = document.getElementById('calculate-btn');
    
    // Verificar que todos los elementos existen
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
        // Obtener valor del input (convertir coma a punto si es necesario)
        let rawValue = amountInput.value.replace(',', '.');
        const amount = parseFloat(rawValue) || 0;
        
        // Calcular valor en bolivianos
        const bobValue = amount * LUPO_RATE;
        const formattedValue = formatNumber(bobValue);
        
        // Actualizar campos
        receivedInput.value = formattedValue;
        resultSpan.textContent = bobValue.toFixed(2); // Sin formato para el span
        
        return { amount, bobValue, formattedValue };
    }
    
    // ===== CONFIGURAR BOTÓN WHATSAPP =====
    function setupWhatsApp(amount, bobValue) {
        whatsappBtn.onclick = function() {
            // Mensaje personalizado
            const message = `Hola LUPO! Quisiera enviar €${amount} a Bolivia. Con tu tasa recibo ${formatNumber(bobValue)} Bs.`;
            
            // Número de WhatsApp (cámbialo al tuyo)
            const phoneNumber = '59171077231'; // Formato internacional sin +
            
            // Crear URL de WhatsApp
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Abrir en nueva pestaña
            window.open(url, '_blank');
        };
    }
    
    // ===== ACTUALIZAR FECHA Y HORA =====
    function updateDateTime() {
        if (!datetimeSpan) return;
        
        const now = new Date();
        
        // Formato: DD/MM/YYYY, HH:MM
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        datetimeSpan.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;
    }
    
    // ===== EVENT LISTENERS =====
    // Calcular al escribir
    amountInput.addEventListener('input', function() {
        const { amount, bobValue } = calculate();
        setupWhatsApp(amount, bobValue);
    });
    
    // Calcular al perder el foco
    amountInput.addEventListener('blur', function() {
        // Si está vacío o es 0, poner valor por defecto
        if (!amountInput.value || parseFloat(amountInput.value) === 0) {
            amountInput.value = '100';
            calculate();
        }
    });
    
    // ===== INICIALIZACIÓN =====
    // Calcular valor inicial
    const { amount, bobValue } = calculate();
    setupWhatsApp(amount, bobValue);
    
    // Actualizar fecha/hora
    updateDateTime();
    setInterval(updateDateTime, 60000); // Actualizar cada minuto
    
    console.log('✅ Calculadora lista y funcionando');
});
