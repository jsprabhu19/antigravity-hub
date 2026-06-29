// Antigravity Documentation Browser Component
import { docsData } from '../data/docs-data.js';

export function renderDocsBrowser(activePageId = 'welcome', sidebarHidden = false, onPageSelect, onToggleSidebar) {
  const container = document.createElement('div');
  container.className = `docs-browser-container ${sidebarHidden ? 'sidebar-hidden' : ''}`;
  
  const activePage = docsData[activePageId] || docsData['welcome'];
  
  // 1. Render Browser Chrome layout
  container.innerHTML = `
    <div class="browser-chrome">
      <div class="browser-tab-bar">
        <div class="browser-tab active">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:14px; height:14px; color:var(--accent-blue);"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
          <span>Antigravity Docs</span>
        </div>
      </div>
      
      <div class="browser-nav-bar">
        <div class="browser-arrows">
          <button class="nav-arrow-btn" id="docs-btn-back" title="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px; height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          </button>
          <button class="nav-arrow-btn disabled" title="Go forward">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px; height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
          <button class="nav-arrow-btn" id="docs-btn-toggle-sidebar" title="Toggle Sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px; height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-12-3h18c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H3.75c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125Z" /></svg>
          </button>
        </div>
        
        <div class="browser-address-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width:14px; height:14px; color:var(--accent-green);"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" /></svg>
          <span class="address-prefix">https://</span>
          <span class="address-domain">antigravity.google</span>
          <span class="address-path">${activePage.path}</span>
        </div>
        
        <div class="browser-search-box">
          <input type="text" id="docs-search-input" placeholder="Search docs..." />
        </div>
      </div>
    </div>
    
    <div class="browser-content">
      <div class="docs-sidebar">
        <!-- Categories injected here -->
      </div>
      
      <article class="docs-content">
        <div class="docs-body-wrapper">
          ${activePage.content}
        </div>
        
        <div class="docs-sandbox-mount"></div>
      </article>
    </div>
  `;
  
  // 2. Group pages by category for sidebar navigation
  const groups = {};
  Object.keys(docsData).forEach(key => {
    if (key === 'welcome') return;
    const page = docsData[key];
    if (!groups[page.category]) {
      groups[page.category] = [];
    }
    groups[page.category].push({ id: key, ...page });
  });
  
  const sidebar = container.querySelector('.docs-sidebar');
  
  // Render sidebar navigation groups
  Object.keys(groups).forEach(category => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'docs-nav-group';
    groupDiv.innerHTML = `
      <div class="docs-nav-group-title">${category}</div>
      <ul class="docs-nav-list"></ul>
    `;
    
    const list = groupDiv.querySelector('.docs-nav-list');
    groups[category].forEach(page => {
      const item = document.createElement('li');
      item.className = `docs-nav-item ${page.id === activePageId ? 'active' : ''}`;
      item.textContent = page.title;
      
      item.addEventListener('click', () => {
        onPageSelect(page.id);
      });
      
      list.appendChild(item);
    });
    
    sidebar.appendChild(groupDiv);
  });
  
  // 3. Inject interactive Sandbox terminal if on the cli-reference page
  if (activePageId === 'cli-reference') {
    const sandboxMount = container.querySelector('.docs-sandbox-mount');
    renderTerminalSandbox(sandboxMount);
  }
  
  // 4. Bind docs search bar
  const searchInput = container.querySelector('#docs-search-input');
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    const items = sidebar.querySelectorAll('.docs-nav-item');
    
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!val || text.includes(val)) {
        item.style.display = 'block';
        item.closest('.docs-nav-group').style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Hide empty groups
    sidebar.querySelectorAll('.docs-nav-group').forEach(group => {
      const visibleItems = group.querySelectorAll('.docs-nav-item[style="display: block;"], .docs-nav-item:not([style])');
      if (visibleItems.length === 0) {
        group.style.display = 'none';
      } else {
        group.style.display = 'block';
      }
    });
  });
  
  // 5. Back Button (return to welcome)
  const backBtn = container.querySelector('#docs-btn-back');
  if (activePageId !== 'welcome' && activePageId !== 'home') {
    backBtn.addEventListener('click', () => {
      onPageSelect('welcome');
    });
  } else {
    backBtn.classList.add('disabled');
    backBtn.style.opacity = '0.3';
    backBtn.style.cursor = 'not-allowed';
  }
  
  // 6. Sidebar Toggle Button
  const toggleSidebarBtn = container.querySelector('#docs-btn-toggle-sidebar');
  if (toggleSidebarBtn) {
    if (sidebarHidden) {
      toggleSidebarBtn.style.color = 'var(--accent-blue)';
      toggleSidebarBtn.style.background = 'rgba(79, 143, 247, 0.1)';
    }
    toggleSidebarBtn.addEventListener('click', () => {
      if (onToggleSidebar) onToggleSidebar();
    });
  }
  
  return container;
}

// Interactive CLI Sandbox Simulator
function renderTerminalSandbox(container) {
  const term = document.createElement('div');
  term.className = 'mock-terminal-sandbox';
  term.style.marginTop = '2.5rem';
  term.style.background = '#090a0f';
  term.style.border = '1px solid var(--border-color)';
  term.style.borderRadius = 'var(--border-radius-md)';
  term.style.padding = '1.25rem';
  term.style.fontFamily = 'monospace';
  term.style.fontSize = '0.85rem';
  
  term.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom:0.5rem; margin-bottom:1rem; color:var(--text-muted);">
      <span style="font-weight:600; font-size:0.75rem; letter-spacing:0.5px; text-transform:uppercase;">Interactive CLI Sandbox Terminal</span>
      <div style="display:flex; align-items:center; gap:0.4rem;">
        <span style="width:8px; height:8px; border-radius:50%; background:var(--accent-green); box-shadow:0 0 8px var(--accent-green);"></span>
        <span style="color:var(--text-muted); font-size:0.75rem;">Online</span>
      </div>
    </div>
    <div class="terminal-output" style="height:150px; overflow-y:auto; color:var(--text-secondary); margin-bottom:1rem; line-height:1.5; scroll-behavior:smooth;">
      <div>Welcome to the Antigravity CLI Simulator.</div>
      <div>Type commands below or click quick commands to execute.</div>
    </div>
    <div class="terminal-quick-links" style="display:flex; gap:0.5rem; margin-bottom:1rem; flex-wrap:wrap;">
      <button class="btn btn-secondary" style="padding:0.25rem 0.6rem; font-size:0.75rem; background:rgba(255,255,255,0.02); border-color:var(--border-color);" data-cmd="agy init">agy init</button>
      <button class="btn btn-secondary" style="padding:0.25rem 0.6rem; font-size:0.75rem; background:rgba(255,255,255,0.02); border-color:var(--border-color);" data-cmd="agy boot">agy boot</button>
      <button class="btn btn-secondary" style="padding:0.25rem 0.6rem; font-size:0.75rem; background:rgba(255,255,255,0.02); border-color:var(--border-color);" data-cmd="agy task list">agy task list</button>
      <button class="btn btn-secondary" style="padding:0.25rem 0.6rem; font-size:0.75rem; background:rgba(255,255,255,0.02); border-color:var(--border-color);" data-cmd="agy auth login --token=my_secret_token">agy auth login</button>
    </div>
    <div style="display:flex; align-items:center; gap:0.5rem;">
      <span style="color:var(--accent-blue); font-weight:600;">[agy-sandbox ~]$</span>
      <input type="text" class="terminal-input" style="background:transparent; border:none; color:white; outline:none; font-family:inherit; font-size:inherit; flex-grow:1;" placeholder="Type command...">
    </div>
  `;
  
  const output = term.querySelector('.terminal-output');
  const input = term.querySelector('.terminal-input');
  
  const outputs = {
    "agy init": [
      "Initializing empty Antigravity workspace session...",
      "✔ Created antigravity.json workspace configuration.",
      "✔ Workspace ready. Start TUI using 'agy boot'."
    ],
    "agy boot": [
      "Booting Antigravity interactive terminal dashboard...",
      "Connecting to Gemini 3.5 Flash core model...",
      "✔ Connection active (Latency: 42ms)",
      "✔ Rendering TUI frames on http://localhost:5173"
    ],
    "agy task list": [
      "Fetching running background subagent tasks...",
      "----------------------------------------------------------------",
      "TASK ID       | CREATED    | TARGET FILE             | STATUS",
      "----------------------------------------------------------------",
      "task-346      | 06:35:08   | style.css               | COMPLETED",
      "task-390      | 06:44:51   | js/components/docs.js   | RUNNING",
      "----------------------------------------------------------------"
    ]
  };
  
  function runCommand(cmd) {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    // Append prompt
    const promptLine = document.createElement('div');
    promptLine.innerHTML = `<span style="color:var(--accent-blue);">[agy-sandbox ~]$</span> ${trimmed}`;
    output.appendChild(promptLine);
    
    setTimeout(() => {
      if (trimmed === 'clear') {
        output.innerHTML = '';
      } else if (outputs[trimmed]) {
        outputs[trimmed].forEach(line => {
          const l = document.createElement('div');
          l.textContent = line;
          if (line.startsWith('✔')) {
            l.style.color = 'var(--accent-green)';
            l.style.fontWeight = '600';
          }
          output.appendChild(l);
        });
      } else if (trimmed.startsWith('agy auth login')) {
        const token = trimmed.split('--token=')[1] || 'default_token';
        const lines = [
          "Authenticating with Gemini Studio Developer Token...",
          `✔ Token loaded: ${token.substring(0, 5)}*****`,
          "✔ Welcome user jsprabhu19! Saved session credentials to local storage."
        ];
        lines.forEach(line => {
          const l = document.createElement('div');
          l.textContent = line;
          if (line.startsWith('✔')) {
            l.style.color = 'var(--accent-green)';
            l.style.fontWeight = '600';
          }
          output.appendChild(l);
        });
      } else {
        const err = document.createElement('div');
        err.style.color = 'var(--accent-red)';
        err.textContent = `agy: command not found: ${trimmed}. Try running 'agy init' or 'agy boot'.`;
        output.appendChild(err);
      }
      
      // Auto-scroll terminal
      output.scrollTop = output.scrollHeight;
    }, 100);
  }
  
  // Bind Input Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      runCommand(val);
      input.value = '';
    }
  });
  
  // Bind Quick Links
  term.querySelectorAll('.terminal-quick-links button').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      runCommand(cmd);
    });
  });
  
  container.appendChild(term);
}
