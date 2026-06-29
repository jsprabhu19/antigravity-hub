// Global Fuzzy Search Command Palette Component
import { showToast } from './toast.js';

export function initSearchPalette(data, onResultSelect) {
  // Create search modal elements if they don't exist
  let overlay = document.querySelector('.modal-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="search-modal">
        <div class="search-input-container">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" /></svg>
          <input type="text" id="search-input" placeholder="Search features, tutorials, or trends... (press Esc to close)" autocomplete="off">
        </div>
        <div class="search-results">
          <!-- Results injected here -->
        </div>
        <div class="search-modal-footer">
          <div class="search-keys">
            <span><kbd>↑↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div>Antigravity Hub Global Search</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  
  const searchInput = overlay.querySelector('#search-input');
  const resultsContainer = overlay.querySelector('.search-results');
  
  let selectedIndex = -1;
  let flatResults = [];
  
  // 1. Keyboard Shortcut listener Ctrl + K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }
    
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      closeModal();
    }
  });
  
  // Header search trigger click
  const headerTrigger = document.querySelector('.search-trigger');
  if (headerTrigger) {
    headerTrigger.addEventListener('click', openModal);
  }
  
  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });
  
  // 2. Search typing listener
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      resultsContainer.innerHTML = '<div style="text-align:center; padding:2rem 0; color:var(--text-muted)">Type a query to begin searching.</div>';
      flatResults = [];
      selectedIndex = -1;
      return;
    }
    
    performSearch(query);
  });
  
  // Keyboard navigation on search results
  searchInput.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.search-item');
    if (items.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatResults.length) {
        selectResult(flatResults[selectedIndex]);
      }
    }
  });
  
  function openModal() {
    overlay.style.display = 'flex';
    searchInput.value = '';
    resultsContainer.innerHTML = '<div style="text-align:center; padding:2rem 0; color:var(--text-muted)">Type a query to begin searching.</div>';
    flatResults = [];
    selectedIndex = -1;
    setTimeout(() => searchInput.focus(), 50);
    document.body.style.overflow = 'hidden'; // Lock scroll
  }
  
  function closeModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Unlock scroll
  }
  
  function updateSelection(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }
  
  // 3. Search Matching Algorithm
  function performSearch(query) {
    const results = {
      features: [],
      tutorials: [],
      trends: []
    };
    
    // Search Features
    data.features.forEach(f => {
      if (f.title.toLowerCase().includes(query) || f.description.toLowerCase().includes(query) || f.tagline.toLowerCase().includes(query)) {
        results.features.push({
          type: 'feature',
          id: f.id,
          title: f.title,
          desc: f.tagline,
          targetSection: 'guide'
        });
      }
    });
    
    // Search Tutorials
    data.tutorials.forEach(t => {
      if (t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query) || t.surface.toLowerCase().includes(query)) {
        results.tutorials.push({
          type: 'tutorial',
          id: t.id,
          title: t.title,
          desc: `${t.surface} • ${t.level}`,
          targetSection: 'tutorials'
        });
      }
    });
    
    // Search Trends
    data.trends.forEach(tr => {
      if (tr.title.toLowerCase().includes(query) || tr.summary.toLowerCase().includes(query) || tr.category.toLowerCase().includes(query)) {
        results.trends.push({
          type: 'trend',
          id: tr.id,
          title: tr.title,
          desc: tr.category,
          targetSection: 'trends'
        });
      }
    });
    
    // Render Results HTML
    resultsContainer.innerHTML = '';
    flatResults = [];
    selectedIndex = -1;
    
    let hasResults = false;
    
    Object.keys(results).forEach(groupKey => {
      const list = results[groupKey];
      if (list.length === 0) return;
      
      hasResults = true;
      const groupDiv = document.createElement('div');
      groupDiv.className = 'search-group';
      groupDiv.innerHTML = `<div class="search-group-title">${groupKey}</div>`;
      
      list.forEach(item => {
        flatResults.push(item);
        const itemIdx = flatResults.length - 1;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'search-item';
        itemDiv.setAttribute('data-index', itemIdx);
        
        // Custom SVG based on item type
        let icon = '';
        if (item.type === 'feature') {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>`;
        } else if (item.type === 'tutorial') {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>`;
        } else {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>`;
        }
        
        itemDiv.innerHTML = `
          <div class="search-item-icon">${icon}</div>
          <div class="search-item-content">
            <span class="search-item-title">${item.title}</span>
            <span class="search-item-desc">${item.desc}</span>
          </div>
        `;
        
        itemDiv.addEventListener('click', () => {
          selectResult(item);
        });
        
        groupDiv.appendChild(itemDiv);
      });
      
      resultsContainer.appendChild(groupDiv);
    });
    
    if (!hasResults) {
      resultsContainer.innerHTML = '<div style="text-align:center; padding:2rem 0; color:var(--text-muted)">No matching results found. Try another query.</div>';
    }
  }
  
  function selectResult(item) {
    closeModal();
    onResultSelect(item);
    showToast(`Navigated to ${item.title}`, 'info');
  }
}
