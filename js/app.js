/**
 * MAIN APP CONTROLLER
 * Orchestrates themes, navigation, dynamic typography, interactive modals,
 * Swarm Drone simulation canvas, and toast notifications.
 */

// Toast notification helper
function showToast(message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  window.soundEngine && window.soundEngine.playSuccess();

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}
window.showToast = showToast;

// Clipboard helper
function copyToClipboard(text, label = 'Copied') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}
window.copyToClipboard = copyToClipboard;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themes = ['midnight', 'emerald', 'amber', 'light'];
  let currentTheme = localStorage.getItem('sdd_theme') || 'midnight';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
      currentTheme = themes[nextIdx];
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('sdd_theme', currentTheme);
      window.soundEngine && window.soundEngine.playClick();
      showToast(`Switched theme to ${currentTheme.toUpperCase()}`);
    });
  }

  // 2. Sound Toggle
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (soundToggleBtn) {
    const updateSoundIcon = () => {
      const isMuted = window.soundEngine && window.soundEngine.isMuted;
      soundToggleBtn.innerHTML = isMuted
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    };
    updateSoundIcon();

    soundToggleBtn.addEventListener('click', () => {
      const muted = window.soundEngine.toggleMute();
      updateSoundIcon();
      showToast(muted ? 'Sound muted' : 'Sound effects enabled');
      if (!muted) window.soundEngine.playPop();
    });
  }

  // 2b. Mobile Drawer Toggle
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      window.soundEngine && window.soundEngine.playClick();
    });

    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Dynamic Typing Effect in Hero
  const typingTarget = document.getElementById('hero-typed-text');
  if (typingTarget) {
    const phrases = [
      "Scalable Backend Microservices",
      "Java 18+ & Spring Boot Architecture",
      "Low-Latency gRPC & Distributed Systems",
      "High-Scale Airline Integrations (Riyadh Air)",
      "AWS Cloud & JFR Performance Engineering"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        typingTarget.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 35;
      } else {
        typingTarget.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 75;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 1800; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  // 4. Skills Category Filtering
  const skillFilters = document.querySelectorAll('.skills-filter-bar .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundEngine && window.soundEngine.playHover();
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      skillCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Active Navbar Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 6. Drone Swarm Interactive Simulation Modal
  const openDroneBtn = document.getElementById('open-drone-sim-btn');
  const droneModal = document.getElementById('drone-modal');
  const closeDroneBtn = document.getElementById('close-drone-modal');

  let droneSimAnimationId = null;

  if (openDroneBtn && droneModal) {
    openDroneBtn.addEventListener('click', () => {
      window.soundEngine && window.soundEngine.playClick();
      droneModal.classList.add('open');
      initDroneSwarmSimulation();
    });
  }

  if (closeDroneBtn && droneModal) {
    closeDroneBtn.addEventListener('click', () => {
      droneModal.classList.remove('open');
      if (droneSimAnimationId) cancelAnimationFrame(droneSimAnimationId);
    });
  }

  if (droneModal) {
    droneModal.addEventListener('click', (e) => {
      if (e.target === droneModal) {
        droneModal.classList.remove('open');
        if (droneSimAnimationId) cancelAnimationFrame(droneSimAnimationId);
      }
    });
  }

  function initDroneSwarmSimulation() {
    const canvas = document.getElementById('drone-swarm-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = 280 * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const w = rect.width;
    const h = 280;

    const numDrones = 24;
    const drones = [];
    let target = { x: w * 0.5, y: h * 0.5, vx: 1.2, vy: 0.8 };

    for (let i = 0; i < numDrones; i++) {
      drones.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        id: `UAV-${101 + i}`,
        battery: Math.floor(Math.random() * 20 + 80)
      });
    }

    function simLoop() {
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Move target
      target.x += target.vx;
      target.y += target.vy;
      if (target.x < 30 || target.x > w - 30) target.vx *= -1;
      if (target.y < 30 || target.y > h - 30) target.vy *= -1;

      // Draw target point
      ctx.beginPath();
      ctx.arc(target.x, target.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(target.x, target.y, 16, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.stroke();

      // Update and draw drones
      drones.forEach((d, idx) => {
        // Cohesion & target attraction
        const dx = target.x - d.x;
        const dy = target.y - d.y;
        d.vx += dx * 0.001;
        d.vy += dy * 0.001;

        // Separation from peers
        drones.forEach((other, oIdx) => {
          if (idx !== oIdx) {
            const sepX = d.x - other.x;
            const sepY = d.y - other.y;
            const dist = Math.hypot(sepX, sepY);
            if (dist < 28 && dist > 0) {
              d.vx += (sepX / dist) * 0.15;
              d.vy += (sepY / dist) * 0.15;
            }
          }
        });

        // Speed clamping
        const speed = Math.hypot(d.vx, d.vy);
        if (speed > 2.8) {
          d.vx = (d.vx / speed) * 2.8;
          d.vy = (d.vy / speed) * 2.8;
        }

        d.x += d.vx;
        d.y += d.vy;

        // Draw drone mesh line to nearest 2 neighbors
        drones.forEach((other) => {
          const dist = Math.hypot(d.x - other.x, d.y - other.y);
          if (dist < 65) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });

        // Draw Drone Node
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.fill();
      });

      // Overlay status
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`SWARM STATUS: 24 UAVs CO-ORDINATING | LEADER TARGET: (${Math.round(target.x)}, ${Math.round(target.y)})`, 15, 25);

      droneSimAnimationId = requestAnimationFrame(simLoop);
    }

    simLoop();
  }
});
