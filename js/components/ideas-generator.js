// Interactive Project Ideas Generator & Roadmap component
import { renderCodeBlock } from './code-block.js';
import { showToast } from './toast.js';
import gsap from 'gsap';

export function renderIdeasGenerator(ideas, activeFilters, onFilterChange) {
  const container = document.createElement('div');
  container.className = 'ideas-container-root';
  
  // 1. Generate Selector Filters HTML
  const levels = ['Beginner', 'Intermediate', 'Expert'];
  const categories = ['All', 'Web', 'CLI', 'SDK', 'Science'];
  
  const levelChips = levels.map(lvl => `
    <button class="filter-chip ${lvl === activeFilters.level ? 'active' : ''}" data-type="level" data-val="${lvl}">${lvl}</button>
  `).join('');
  
  const catChips = categories.map(cat => `
    <button class="filter-chip ${cat === activeFilters.category ? 'active' : ''}" data-type="category" data-val="${cat}">${cat}</button>
  `).join('');
  
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1.25rem; margin-bottom:2rem;">
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
        <span style="font-size:0.85rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); width:120px;">Difficulty:</span>
        <div class="filter-group" id="filter-level-group">${levelChips}</div>
      </div>
      <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
        <span style="font-size:0.85rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); width:120px;">Category:</span>
        <div class="filter-group" id="filter-cat-group">${catChips}</div>
      </div>
    </div>
    
    <div class="ideas-viewport-split" style="display:grid; grid-template-columns: 1fr; gap:2rem;">
      <!-- Active Idea Card and Roadmap Timeline gets injected here -->
    </div>
  `;
  
  const viewport = container.querySelector('.ideas-viewport-split');
  
  // 2. Filter matching ideas
  const filtered = ideas.filter(idea => {
    const levelMatch = idea.level === activeFilters.level;
    const catMatch = activeFilters.category === 'All' || idea.category === activeFilters.category;
    return levelMatch && catMatch;
  });
  
  if (filtered.length === 0) {
    viewport.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:4rem 0; background:var(--bg-glass); border:1px dashed var(--border-color); border-radius:var(--border-radius-md); color:var(--text-secondary)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12" style="margin:0 auto 1rem; opacity:0.3;"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 21m0 0-.813-5.096L9 21Zm0 0h4.5m-4.5 0h-4.5m4.5 0 3.375-3.375" /></svg>
        <p>No project ideas match the selected Difficulty and Category. Try swapping filters!</p>
      </div>
    `;
  } else {
    // Render the first matching idea
    const activeIdea = filtered[0];
    const cardEl = renderActiveIdeaCard(activeIdea);
    viewport.appendChild(cardEl);
  }
  
  // Bind Filter Events
  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const type = e.currentTarget.getAttribute('data-type');
      const val = e.currentTarget.getAttribute('data-val');
      onFilterChange(type, val);
    });
  });
  
  return container;
}

function renderActiveIdeaCard(idea) {
  const card = document.createElement('div');
  card.className = 'ideas-roadmap-card';
  card.style.cssText = `
    background: var(--bg-glass);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 2.5rem;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  `;
  
  const levelClass = `difficulty-${idea.level.toLowerCase()}`;
  const catClass = `badge-surface`; // standard accent blue
  
  // Read checked tasks progress from LocalStorage
  const storageKey = `idea_progress_${idea.id}`;
  let checkedIndices = JSON.parse(localStorage.getItem(storageKey)) || [];
  
  const roadmapHtml = idea.roadmap.map((step, idx) => {
    const isChecked = checkedIndices.includes(idx);
    return `
      <div class="roadmap-checkbox-item" style="display:flex; align-items:flex-start; gap:1rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px dashed rgba(255,255,255,0.03);" data-index="${idx}">
        <input type="checkbox" id="task-${idea.id}-${idx}" class="roadmap-cb" style="margin-top:0.25rem; width:16px; height:16px; accent-color:var(--accent-blue); cursor:pointer;" ${isChecked ? 'checked' : ''}>
        <label for="task-${idea.id}-${idx}" style="font-size:0.95rem; line-height:1.5; color:${isChecked ? 'var(--text-muted)' : 'var(--text-primary)'}; text-decoration:${isChecked ? 'line-through' : 'none'}; cursor:pointer; flex-grow:1; transition:var(--transition-fast);">
          ${step.text}
        </label>
      </div>
    `;
  }).join('');
  
  card.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <h3 style="font-size:1.75rem; color:var(--text-primary);">${idea.title}</h3>
      <div style="display:flex; gap:0.5rem; align-items:center;">
        <span class="badge ${levelClass}">${idea.level}</span>
        <span class="badge ${catClass}">${idea.category}</span>
      </div>
    </div>
    
    <p style="font-size:1rem; color:var(--text-secondary); margin-bottom:1.5rem; line-height:1.6;">${idea.description}</p>
    
    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1.25rem; margin-bottom:2rem;">
      <h4 style="font-size:0.9rem; text-transform:uppercase; color:var(--accent-amber); margin-bottom:0.5rem; letter-spacing:0.5px;">Architectural Challenge</h4>
      <p style="font-size:0.9rem; line-height:1.5; color:var(--text-secondary);">${idea.challenge}</p>
    </div>
    
    <div class="ideas-split-layouts" style="display:grid; grid-template-columns: 1fr 1fr; gap:2.5rem;">
      <!-- Left side: Interactive Roadmap -->
      <div>
        <h4 style="font-size:1.1rem; color:var(--text-primary); margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-accent-blue" style="color:var(--accent-blue)"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" /></svg>
          Interactive Roadmap Checklist
        </h4>
        <div class="roadmap-checklist-container">
          ${roadmapHtml}
        </div>
      </div>
      
      <!-- Right side: Starter Code -->
      <div>
        <h4 style="font-size:1.1rem; color:var(--text-primary); margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" style="color:var(--accent-purple)"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>
          Starter Template
        </h4>
        <div class="starter-code-inject"></div>
      </div>
    </div>
  `;
  
  // Inject the highlighted code block
  const codeInject = card.querySelector('.starter-code-inject');
  const codeBlock = renderCodeBlock(idea.starterCode, idea.language);
  codeInject.appendChild(codeBlock);
  
  // If there's an expected output, render it
  if (idea.output) {
    const outDiv = document.createElement('div');
    outDiv.className = 'code-output';
    outDiv.innerHTML = `
      <div class="code-output-title">Expected Console Output</div>
      <pre>${idea.output}</pre>
    `;
    codeInject.appendChild(outDiv);
  }
  
  // Bind Checkbox events
  const checkboxes = card.querySelectorAll('.roadmap-cb');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const idxItem = parseInt(e.currentTarget.closest('.roadmap-checkbox-item').getAttribute('data-index'));
      const label = e.currentTarget.nextElementSibling;
      const isChecked = e.currentTarget.checked;
      
      if (isChecked) {
        label.style.color = 'var(--text-muted)';
        label.style.textDecoration = 'line-through';
        if (!checkedIndices.includes(idxItem)) {
          checkedIndices.push(idxItem);
        }
      } else {
        label.style.color = 'var(--text-primary)';
        label.style.textDecoration = 'none';
        checkedIndices = checkedIndices.filter(item => item !== idxItem);
      }
      
      // Save progress to LocalStorage
      localStorage.setItem(storageKey, JSON.stringify(checkedIndices));
      
      // If all tasks are completed, trigger success feedback
      if (checkedIndices.length === idea.roadmap.length) {
        showToast(`Congratulations! You planned '${idea.title}' 🎉`, 'success');
        triggerLightConfetti();
      }
    });
  });
  
  // GSAP card reveal
  gsap.fromTo(card,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
  
  return card;
}

// Minimal confetti compositor for ideas completions
function triggerLightConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);
  
  const particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * w,
      y: h + 10,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 10 + 6),
      size: Math.random() * 5 + 3,
      color: ['#4f8ff7', '#a855f7', '#06b6d4'][Math.floor(Math.random() * 3)],
      alpha: 1
    });
  }
  
  function frame() {
    ctx.clearRect(0, 0, w, h);
    let active = false;
    particles.forEach(p => {
      if (p.alpha > 0) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.alpha -= 0.015;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        active = true;
      }
    });
    if (active) requestAnimationFrame(frame);
    else canvas.remove();
  }
  frame();
}
