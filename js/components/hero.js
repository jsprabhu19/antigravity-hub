// Hero and landing component
import gsap from 'gsap';

export function initHero() {
  initParticleSystem();
  animateStats();
  initTypewriter();
  
  // Set up CTA scroll behaviors
  const startBtn = document.getElementById('btn-start-learning');
  const trendsBtn = document.getElementById('btn-explore-trends');
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  if (trendsBtn) {
    trendsBtn.addEventListener('click', () => {
      document.getElementById('trends')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// 1. Canvas Constellation Particle System
function initParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);
  
  const particles = [];
  const particleCount = Math.min(60, Math.floor((width * height) / 15000));
  const connectionDistance = 120;
  
  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Boundary check
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.fill();
    }
  }
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation Loop
  function loop() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        
        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(79, 143, 247, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(loop);
  }
  
  loop();
}

// 2. Stat Counter Animations with GSAP
function animateStats() {
  const statValues = document.querySelectorAll('.stat-val');
  statValues.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const isFloat = stat.getAttribute('data-target').includes('.');
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
        once: true
      },
      onUpdate: () => {
        if (isFloat) {
          stat.textContent = obj.value.toFixed(1);
        } else {
          stat.textContent = Math.floor(obj.value) + (stat.textContent.includes('+') ? '+' : '');
        }
      }
    });
  });
}

// 3. Typewriter heading animation
function initTypewriter() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  
  const text = title.textContent.trim();
  title.textContent = '';
  
  // Separate into letter spans
  const letters = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    if (char === ' ') span.innerHTML = '&nbsp;';
    title.appendChild(span);
    return span;
  });
  
  // Staggered reveal
  gsap.to(letters, {
    opacity: 1,
    y: 0,
    stagger: 0.03,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.2
  });
}
