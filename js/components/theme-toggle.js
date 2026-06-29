// Theme Toggle Component (Light / Dark Mode)
import gsap from 'gsap';

export function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    updateToggleIcon(toggleBtn, 'light');
  } else {
    document.documentElement.classList.remove('light-theme');
    updateToggleIcon(toggleBtn, 'dark');
  }
  
  toggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    
    // Animate toggle click
    gsap.fromTo(toggleBtn, 
      { scale: 0.8, rotation: 0 }, 
      { scale: 1, rotation: 360, duration: 0.4, ease: 'back.out(1.5)' }
    );
    
    updateToggleIcon(toggleBtn, newTheme);
  });
}

function updateToggleIcon(btn, theme) {
  // SVG for Sun (Light Mode) and Moon (Dark Mode)
  if (theme === 'light') {
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    `;
    btn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    `;
    btn.setAttribute('title', 'Switch to Light Mode');
  }
}
