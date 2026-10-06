/**
 * FLUIDIC BACKGROUND CANVAS
 * High-performance interactive particle-wave fluid physics simulation.
 * Responds to pointer tracking, mouse velocity, clicks, and touches.
 */

class FluidCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 65;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.pointer = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      prevX: this.width * 0.5,
      prevY: this.height * 0.5,
      vx: 0,
      vy: 0,
      radius: 180,
      isActive: false
    };

    this.ripples = [];
    this.animationFrameId = null;
    this.themeColors = this.getThemeColors();

    this.init();
  }

  getThemeColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'midnight';
    if (theme === 'emerald') {
      return {
        primary: 'rgba(16, 185, 129, ',
        secondary: 'rgba(52, 211, 153, ',
        accent: 'rgba(5, 150, 105, '
      };
    } else if (theme === 'amber') {
      return {
        primary: 'rgba(245, 158, 11, ',
        secondary: 'rgba(251, 191, 36, ',
        accent: 'rgba(217, 119, 6, '
      };
    } else if (theme === 'light') {
      return {
        primary: 'rgba(2, 132, 199, ',
        secondary: 'rgba(99, 102, 241, ',
        accent: 'rgba(14, 165, 233, '
      };
    }
    // Midnight (default)
    return {
      primary: 'rgba(56, 189, 248, ',
      secondary: 'rgba(99, 102, 241, ',
      accent: 'rgba(0, 242, 254, '
    };
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    
    // Scale particle count for smaller screens
    if (this.width < 768) {
      this.numParticles = 35;
    } else {
      this.numParticles = 65;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
        radius: Math.random() * 2.2 + 1.2,
        density: Math.random() * 20 + 8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        phase: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * 3)
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    const updatePointer = (x, y) => {
      this.pointer.vx = (x - this.pointer.prevX) * 0.25;
      this.pointer.vy = (y - this.pointer.prevY) * 0.25;
      this.pointer.prevX = this.pointer.x;
      this.pointer.prevY = this.pointer.y;
      this.pointer.x = x;
      this.pointer.y = y;
      this.pointer.isActive = true;

      // Update CSS custom property for mouse position tracking in cards
      document.documentElement.style.setProperty('--mouse-x', `${(x / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--mouse-y', `${(y / window.innerHeight) * 100}%`);
    };

    window.addEventListener('mousemove', (e) => {
      updatePointer(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        this.ripples.push({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          radius: 4,
          maxRadius: 130,
          alpha: 0.45,
          growth: 3.5
        });
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.pointer.isActive = false;
    });

    // Add interactive click ripple
    window.addEventListener('click', (e) => {
      this.ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 160,
        alpha: 0.6,
        growth: 4
      });
    });

    // Observer for theme changes
    const observer = new MutationObserver(() => {
      this.themeColors = this.getThemeColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  updateRipples() {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const ripple = this.ripples[i];
      ripple.radius += ripple.growth;
      ripple.alpha *= 0.94;

      if (ripple.radius >= ripple.maxRadius || ripple.alpha <= 0.02) {
        this.ripples.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `${this.themeColors.accent}${ripple.alpha})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle pointer velocity decay
    this.pointer.vx *= 0.92;
    this.pointer.vy *= 0.92;

    // Draw and update particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Oscillating float motion
      p.phase += 0.015;
      p.x += p.vx + Math.sin(p.phase) * 0.4;
      p.y += p.vy + Math.cos(p.phase) * 0.4;

      // Pointer influence / fluid deflection
      if (this.pointer.isActive) {
        const dx = this.pointer.x - p.x;
        const dy = this.pointer.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.pointer.radius) {
          const force = (this.pointer.radius - distance) / this.pointer.radius;
          const maxDistance = this.pointer.radius;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const directionX = forceDirectionX * force * p.density * 0.6;
          const directionY = forceDirectionY * force * p.density * 0.6;

          p.x -= directionX - this.pointer.vx * 0.5;
          p.y -= directionY - this.pointer.vy * 0.5;
        }
      }

      // Screen boundary wrapping
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Draw particle
      let color = this.themeColors.primary;
      if (p.colorIndex === 1) color = this.themeColors.secondary;
      if (p.colorIndex === 2) color = this.themeColors.accent;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${color}0.75)`;
      this.ctx.fill();

      // Fluid mesh connections between close particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        const maxDist = 135;

        if (dist2 < maxDist) {
          const alpha = (1 - dist2 / maxDist) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `${color}${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.updateRipples();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Instantiate once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.fluidCanvasInstance = new FluidCanvas('fluid-canvas');
});
