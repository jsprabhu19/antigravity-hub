// GSAP Animation Orchestrator
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  initPageLoadSequence();
  initScrollSpyProgress();
  initSectionRevealAnimations();
}

// 1. Entrance timeline when page first loads
function initPageLoadSequence() {
  const tl = gsap.timeline();
  
  tl.fromTo('header', 
    { y: -70, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
  );
  
  tl.fromTo('aside', 
    { x: -280, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  );
  
  tl.fromTo('.hero-badge', 
    { scale: 0.8, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
    '-=0.2'
  );
  
  tl.fromTo('.hero-subtitle', 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  );
  
  tl.fromTo('.hero-ctas .btn', 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  );
  
  tl.fromTo('.hero-stats', 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.8, ease: 'power2.out' },
    '-=0.2'
  );
}

// 2. Reading progress bar at the very top of page
function initScrollSpyProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.position = 'absolute';
  progressBar.style.bottom = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.background = 'var(--gradient-primary)';
  progressBar.style.width = '0%';
  progressBar.style.zIndex = '101';
  progressBar.style.transition = 'width 0.1s linear';
  
  const header = document.querySelector('header');
  if (header) {
    header.appendChild(progressBar);
  }
  
  window.addEventListener('scroll', () => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollMax <= 0) return;
    const pct = (window.scrollY / scrollMax) * 100;
    progressBar.style.width = `${pct}%`;
  });
}

// 3. Staggered reveal animations as sections are scrolled into view
function initSectionRevealAnimations() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(sec => {
    // Reveal section headers
    const header = sec.querySelector('.section-header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Reveal grid/card containers
    const content = sec.querySelector('.guide-grid, .ecosystem-container, .tutorials-container, .trends-container-root');
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}
