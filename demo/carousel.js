/**
 * Carrusel de Bancos Bolivianos
 * Carrusel infinito que gira automáticamente
 */

class BankCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.bankItems = document.querySelectorAll('.bank-item');
    this.isPaused = false;
    this.speed = 20000; // 20 segundos para una vuelta completa
    
    this.init();
  }
  
  init() {
    if (!this.track || this.bankItems.length === 0) return;
    
    // Clonar los items para crear el efecto infinito
    this.cloneItems();
    
    // Pausar al hacer hover
    this.addHoverListeners();
    
    // Ajustar velocidad según preferencias del usuario
    this.adjustSpeedForAccessibility();
    
    console.log('🏦 Carrusel de bancos bolivianos iniciado');
  }
  
  cloneItems() {
    // Guardar el ancho original
    const originalWidth = this.track.scrollWidth;
    
    // Clonar todos los items para crear el efecto infinito
    this.bankItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('clone');
      this.track.appendChild(clone);
    });
    
    // Clonar una segunda vez para asegurar que nunca se vea el final
    this.bankItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('clone');
      this.track.appendChild(clone);
    });
    
    console.log(`📦 Clonados ${this.bankItems.length * 2} items para carrusel infinito`);
  }
  
  addHoverListeners() {
    const carousel = document.querySelector('.bank-carousel');
    
    carousel.addEventListener('mouseenter', () => {
      this.isPaused = true;
      this.track.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.track.style.animationPlayState = 'running';
    });
  }
  
  adjustSpeedForAccessibility() {
    // Si el usuario prefiere movimiento reducido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.track.style.animation = 'scrollBanks 40s linear infinite';
      console.log('🐢 Modo movimiento reducido activado');
    }
  }
  
  // Método para cambiar la velocidad
  setSpeed(seconds) {
    this.speed = seconds * 1000;
    this.track.style.animation = `scrollBanks ${seconds}s linear infinite`;
  }
  
  // Método para reiniciar la animación
  restart() {
    this.track.style.animation = 'none';
    this.track.offsetHeight; // Forzar reflow
    this.track.style.animation = `scrollBanks ${this.speed / 1000}s linear infinite`;
  }
}

// ===== VERSIÓN 2: CARRUSEL CON CONTROLES (opcional) =====

class BankCarouselWithControls extends BankCarousel {
  constructor() {
    super();
    this.addControls();
  }
  
  addControls() {
    const container = document.querySelector('.bank-carousel');
    
    // Crear contenedor de controles
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 16px;
    `;
    
    // Botón pausa/play
    const pauseBtn = document.createElement('button');
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    pauseBtn.style.cssText = `
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: white;
      color: var(--red);
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    pauseBtn.addEventListener('mouseenter', () => {
      pauseBtn.style.transform = 'scale(1.1)';
      pauseBtn.style.background = 'var(--red)';
      pauseBtn.style.color = 'white';
    });
    
    pauseBtn.addEventListener('mouseleave', () => {
      pauseBtn.style.transform = 'scale(1)';
      pauseBtn.style.background = 'white';
      pauseBtn.style.color = 'var(--red)';
    });
    
    pauseBtn.addEventListener('click', () => {
      if (this.isPaused) {
        this.track.style.animationPlayState = 'running';
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        this.isPaused = false;
      } else {
        this.track.style.animationPlayState = 'paused';
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        this.isPaused = true;
      }
    });
    
    controls.appendChild(pauseBtn);
    
    // Botón de velocidad (opcional)
    const speedBtn = document.createElement('button');
    speedBtn.innerHTML = '<i class="fa-solid fa-gauge-high"></i>';
    speedBtn.style.cssText = `
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: white;
      color: var(--green);
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    let speedIndex = 0;
    const speeds = [20, 15, 10];
    
    speedBtn.addEventListener('mouseenter', () => {
      speedBtn.style.transform = 'scale(1.1)';
      speedBtn.style.background = 'var(--green)';
      speedBtn.style.color = 'white';
    });
    
    speedBtn.addEventListener('mouseleave', () => {
      speedBtn.style.transform = 'scale(1)';
      speedBtn.style.background = 'white';
      speedBtn.style.color = 'var(--green)';
    });
    
    speedBtn.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % speeds.length;
      this.setSpeed(speeds[speedIndex]);
      
      // Feedback visual
      speedBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        speedBtn.style.transform = 'scale(1)';
      }, 200);
    });
    
    controls.appendChild(speedBtn);
    
    container.appendChild(controls);
  }
}

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', () => {
  // Verificar si existe el carrusel
  if (document.querySelector('.bank-carousel')) {
    // Usar versión simple
    new BankCarousel();
    
    // Si quieres la versión con controles, cambia a:
    // new BankCarouselWithControls();
  }
});

// ===== EXPORT (si usas módulos) =====
// export { BankCarousel, BankCarouselWithControls };
