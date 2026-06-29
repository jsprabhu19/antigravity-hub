// Tutorial Stepper Component
import { renderCodeBlock } from './code-block.js';
import { showToast } from './toast.js';
import gsap from 'gsap';

export function renderTutorialsList(tutorials, activeId, completedIds = [], onSelect) {
  const container = document.createElement('div');
  container.className = 'tutorials-list-panel';
  
  // Group by surface
  const groups = {};
  tutorials.forEach(t => {
    if (!groups[t.surface]) {
      groups[t.surface] = [];
    }
    groups[t.surface].push(t);
  });
  
  Object.keys(groups).forEach(surface => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'tutorials-sidebar-group';
    
    groupDiv.innerHTML = `
      <div class="tutorials-group-title">${surface}</div>
      <div class="tutorials-group-list"></div>
    `;
    
    const listDiv = groupDiv.querySelector('.tutorials-group-list');
    
    groups[surface].forEach(t => {
      const isCompleted = completedIds.includes(t.id);
      const item = document.createElement('div');
      item.className = `tutorial-list-item ${t.id === activeId ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      
      const checkmarkIcon = isCompleted 
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4" style="color:var(--accent-green); flex-shrink:0;"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" /></svg>`
        : '';
        
      item.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem;">
          <div class="tutorial-item-title" style="flex-grow:1;">${t.title}</div>
          ${checkmarkIcon}
        </div>
        <div class="tutorial-item-meta">
          <span>${t.level}</span>
        </div>
      `;
      
      item.addEventListener('click', () => {
        onSelect(t.id);
      });
      
      listDiv.appendChild(item);
    });
    
    container.appendChild(groupDiv);
  });
  
  return container;
}

export function renderTutorialStepper(tutorial, currentStepIndex = 0, onStepChange, onComplete) {
  const container = document.createElement('div');
  container.className = 'tutorial-stepper-view';
  
  const steps = tutorial.steps;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;
  
  container.innerHTML = `
    <div class="tutorial-view-header">
      <h3 style="font-size:1.75rem; color:var(--text-primary)">${tutorial.title}</h3>
      <div class="tutorial-view-meta">
        <span class="badge badge-surface">${tutorial.surface}</span>
        <span class="badge badge-level">${tutorial.level}</span>
      </div>
      <p style="margin-top:1rem; font-size:0.95rem; color:var(--text-secondary)">${tutorial.description}</p>
    </div>
    
    <div class="stepper-timeline"></div>
    
    <div class="stepper-controls">
      <button class="btn btn-secondary" id="btn-prev-step" ${isFirstStep ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        <span>Previous</span>
      </button>
      <button class="btn btn-primary" id="btn-next-step">
        <span>${isLastStep ? 'Complete Tutorial' : 'Next Step'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
      </button>
    </div>
  `;
  
  const timeline = container.querySelector('.stepper-timeline');
  
  steps.forEach((step, idx) => {
    const stepDiv = document.createElement('div');
    
    let statusClass = '';
    if (idx === currentStepIndex) statusClass = 'active';
    else if (idx < currentStepIndex) statusClass = 'completed';
    
    stepDiv.className = `stepper-step ${statusClass}`;
    stepDiv.innerHTML = `
      <div class="step-indicator">${idx + 1}</div>
      <div class="step-title">${step.title}</div>
      <div class="step-instruction">${step.instruction}</div>
      <div class="step-content">
        <div class="step-code-container"></div>
      </div>
    `;
    
    if (idx === currentStepIndex) {
      const codeContainer = stepDiv.querySelector('.step-code-container');
      const isText = step.language === 'text';
      const codeBlock = renderCodeBlock(step.code, step.language);
      codeContainer.appendChild(codeBlock);
      
      if (step.output) {
        const outDiv = document.createElement('div');
        outDiv.className = 'code-output';
        outDiv.innerHTML = `
          <div class="code-output-title">Expected Console Output</div>
          <pre>${step.output}</pre>
        `;
        codeContainer.appendChild(outDiv);
      }
    }
    
    timeline.appendChild(stepDiv);
  });
  
  // Bind Controls
  container.querySelector('#btn-prev-step').addEventListener('click', () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  });
  
  container.querySelector('#btn-next-step').addEventListener('click', () => {
    if (currentStepIndex < steps.length - 1) {
      onStepChange(currentStepIndex + 1);
    } else {
      triggerConfetti();
      showToast('Tutorial Completed! 🎉', 'success');
      onComplete();
    }
  });
  
  return container;
}

// 4. Custom canvas confetti particle effect
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  const colors = ['#4f8ff7', '#a855f7', '#06b6d4', '#10b981', '#fb923c'];
  const particles = [];
  
  class ConfettiParticle {
    constructor() {
      this.x = width / 2;
      this.y = height + 20;
      this.radius = Math.random() * 6 + 4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 15;
      this.vy = -(Math.random() * 15 + 10);
      this.gravity = 0.4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.alpha = 1;
    }
    
    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      
      if (this.vy > 0) {
        this.alpha -= 0.02;
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
      ctx.restore();
    }
  }
  
  for (let i = 0; i < 100; i++) {
    particles.push(new ConfettiParticle());
  }
  
  function loop() {
    ctx.clearRect(0, 0, width, height);
    
    let active = false;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.alpha > 0) {
        p.update();
        p.draw();
        active = true;
      }
    }
    
    if (active) {
      requestAnimationFrame(loop);
    } else {
      canvas.remove();
    }
  }
  
  loop();
}
