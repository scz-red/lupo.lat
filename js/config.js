// ============================================
// config.js - ÚNICO ARCHIVO DE CONFIGURACIÓN
// ============================================
// Aquí controlas TODO: tipo de cambio y descuento
// ============================================

const LUPO_CONFIG = {
    // 💶 TIPO DE CAMBIO BASE (1 EUR = ? BOB)
    // Ejemplo: 10.61 significa que 1€ = 10.61 bolivianos
    tipoCambioBase: 10.61,
    
    // 📉 PORCENTAJE DE DESCUENTO (0.09 = 9%)
    // Ejemplo: 0.09 = 9% de descuento sobre la tasa base
    descuento: 0.09
};

// ============================================
// NO TOCAR NADA DE AQUÍ PARA ABAJO
// ============================================

// Hacer disponible globalmente
window.LUPO_CONFIG = LUPO_CONFIG;

// Calcular tasa final con descuento
const tasaFinal = LUPO_CONFIG.tipoCambioBase * (1 - LUPO_CONFIG.descuento);

console.log('⚙️ Configuración cargada:', {
    'Tasa base': LUPO_CONFIG.tipoCambioBase + ' Bs/€',
    'Descuento': (LUPO_CONFIG.descuento * 100) + '%',
    'Tasa final': tasaFinal.toFixed(2) + ' Bs/€'
});
