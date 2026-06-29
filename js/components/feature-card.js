// Feature Card and Expanded Details Component
import { renderCodeBlock } from './code-block.js';
import gsap from 'gsap';

export function renderFeatureCard(data, onCardClick) {
  const card = document.createElement('div');
  card.className = 'feature-card';
  card.setAttribute('data-id', data.id);
  
  const difficultyClass = `difficulty-${data.difficulty.toLowerCase()}`;
  
  card.innerHTML = `
    <div class="card-icon">${data.icon}</div>
    <span class="card-difficulty ${difficultyClass}">${data.difficulty}</span>
    <h3 class="card-title">${data.title}</h3>
    <p class="card-desc">${data.description}</p>
    <div class="card-action-bar">
      <span class="card-tagline">${data.tagline}</span>
      <span class="card-link">
        <span>Explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
      </span>
    </div>
  `;
  
  card.addEventListener('click', () => {
    onCardClick(data);
  });
  
  return card;
}

export function renderFeatureDetails(data, onClose) {
  const detailContainer = document.createElement('div');
  detailContainer.className = 'guide-details';
  detailContainer.id = 'guide-details-view';
  
  // Sections HTML
  const sectionsHtml = data.sections.map(sec => `
    <div class="sub-block">
      <h4>${sec.title}</h4>
      <p>${sec.content}</p>
    </div>
  `).join('');
  
  // Right hand pane (Shortcuts or Slash commands or Info)
  let rightPaneHtml = '';
  if (data.shortcuts && data.shortcuts.length > 0) {
    const rows = data.shortcuts.map(sh => `
      <tr>
        <td><kbd>${sh.keys}</kbd></td>
        <td>${sh.action}</td>
      </tr>
    `).join('');
    
    rightPaneHtml = `
      <div class="detail-right-blocks">
        <h4 style="margin-bottom:0.75rem; font-size:1rem; color:var(--text-primary)">Keyboard Shortcuts</h4>
        <table class="shortcuts-table">
          <thead>
            <tr>
              <th>Keys</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  } else if (data.slashCommands && data.slashCommands.length > 0) {
    const commands = data.slashCommands.map(cmd => `
      <div class="slash-item">
        <div class="slash-cmd">${cmd.command}</div>
        <div class="slash-desc">${cmd.description}</div>
      </div>
    `).join('');
    
    rightPaneHtml = `
      <div class="detail-right-blocks">
        <h4 style="margin-bottom:0.75rem; font-size:1rem; color:var(--text-primary)">Slash Commands</h4>
        <div class="slash-list">
          ${commands}
        </div>
      </div>
    `;
  } else {
    rightPaneHtml = `
      <div class="detail-right-blocks">
        <h4 style="margin-bottom:0.75rem; font-size:1rem; color:var(--text-primary)">Feature Level</h4>
        <p style="font-size:0.9rem; margin-bottom:1rem">This suite is configured for <strong>${data.difficulty}</strong> users of the Antigravity ecosystem.</p>
        <h4 style="margin-bottom:0.5rem; font-size:0.85rem; color:var(--text-muted); text-transform:uppercase">Quick Notes</h4>
        <p style="font-size:0.85rem; color:var(--text-secondary)">Make sure your workspace environment is correctly updated, and your ADC credentials are verified before executing API calls.</p>
      </div>
    `;
  }
  
  // Examples Selector HTML
  const exampleTabsHtml = data.examples.map((ex, idx) => `
    <button class="example-tab ${idx === 0 ? 'active' : ''}" data-index="${idx}">${ex.title}</button>
  `).join('');
  
  detailContainer.innerHTML = `
    <div class="detail-header">
      <div class="detail-header-left">
        <div class="detail-icon">${data.icon}</div>
        <div class="detail-info">
          <h3>${data.title}</h3>
          <p>${data.tagline}</p>
        </div>
      </div>
      <button class="btn-close" title="Close details">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </div>
    
    <div class="detail-body-grid">
      <div class="detail-content-blocks">
        ${sectionsHtml}
      </div>
      ${rightPaneHtml}
    </div>
    
    <div class="detail-examples">
      <h4 style="margin-bottom:1rem; font-size:1.15rem; color:var(--text-primary)">Interactive Examples</h4>
      <div class="example-selector">
        ${exampleTabsHtml}
      </div>
      <div class="active-example-container"></div>
    </div>
  `;
  
  // Event: Close Button
  detailContainer.querySelector('.btn-close').addEventListener('click', () => {
    gsap.to(detailContainer, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: onClose
    });
  });
  
  // Handle Example Tab Swaps
  const tabs = detailContainer.querySelectorAll('.example-tab');
  const codeContainer = detailContainer.querySelector('.active-example-container');
  
  function loadExample(index) {
    const example = data.examples[index];
    codeContainer.innerHTML = '';
    
    if (example) {
      const codeBlock = renderCodeBlock(example.code, example.language);
      codeContainer.appendChild(codeBlock);
      
      // If there is expected output, render it
      if (example.output) {
        const outDiv = document.createElement('div');
        outDiv.className = 'code-output';
        outDiv.innerHTML = `
          <div class="code-output-title">Expected Output</div>
          <pre>${example.output}</pre>
        `;
        codeContainer.appendChild(outDiv);
      }
    }
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const index = parseInt(e.currentTarget.getAttribute('data-index'));
      loadExample(index);
    });
  });
  
  // Load default first example
  loadExample(0);
  
  // Smooth entrance
  gsap.fromTo(detailContainer, 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
  
  return detailContainer;
}
