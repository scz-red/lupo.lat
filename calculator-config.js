// calculator-config.js
// ============================================
// CONFIGURACIÓN DE LA CALCULADORA
// Cambia estos valores y se actualizará automáticamente
// ============================================

const CALCULATOR_CONFIG = {
    // Tasa base del euro en bolivianos (1 EUR = ? BOB)
    // Ejemplo: 10.61 significa que 1€ = 10.61 Bs
    baseRate: 10.61,
    
    // Porcentaje de descuento que aplica LUPO (0.09 = 9%)
    // Ejemplo: 0.09 = 9% de descuento sobre la tasa base
    discount: 0.09
};

// Hacer disponible globalmente
window.CALCULATOR_CONFIG = CALCULATOR_CONFIG;
