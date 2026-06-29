// Trends Feed Component
import gsap from 'gsap';

export function renderTrendsFeed(trends, activeCategory, onCategoryChange, onLearnTutorial) {
  const container = document.createElement('div');
  container.className = 'trends-container-root';
  
  // 1. Generate category chips
  const categories = ['All', ...new Set(trends.map(t => t.category))];
  const chipsHtml = categories.map(cat => `
    <button class="filter-chip ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">${cat}</button>
  `).join('');
  
  container.innerHTML = `
    <div class="trends-header">
      <div class="filter-group">
        ${chipsHtml}
      </div>
    </div>
    
    <div class="trends-grid"></div>
  `;
  
  const grid = container.querySelector('.trends-grid');
  
  // Filter trends
  const filteredTrends = activeCategory === 'All' 
    ? trends 
    : trends.filter(t => t.category === activeCategory);
    
  // Render cards
  filteredTrends.forEach(t => {
    const card = document.createElement('div');
    card.className = 'trend-card';
    card.setAttribute('data-id', t.id);
    
    const impactClass = `impact-${t.impact.toLowerCase()}`;
    const tagsHtml = t.tags.map(tag => `<span class="trend-tag">${tag}</span>`).join('');
    
    card.innerHTML = `
      <div class="trend-meta">
        <span class="trend-source">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V6c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125V7.5Z" /></svg>
          <span>${t.source}</span>
        </span>
        <span class="trend-impact ${impactClass}">${t.impact} Impact</span>
      </div>
      
      <h3 class="trend-title">${t.title}</h3>
      <p class="trend-summary">${t.summary}</p>
      
      <div class="trend-footer">
        <div class="trend-tags">${tagsHtml}</div>
        ${t.relatedTutorial ? `
          <span class="trend-link" data-tutorial="${t.relatedTutorial}">
            <span>Learn Tutorial</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </span>
        ` : ''}
      </div>
    `;
    
    // Bind Learn Tutorial Click
    if (t.relatedTutorial) {
      card.querySelector('.trend-link').addEventListener('click', (e) => {
        e.stopPropagation();
        onLearnTutorial(t.relatedTutorial);
      });
    }
    
    grid.appendChild(card);
  });
  
  // Stagger entry animation using GSAP
  setTimeout(() => {
    const cards = grid.querySelectorAll('.trend-card');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, 50);
  
  // Bind chips click handlers
  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const category = e.currentTarget.getAttribute('data-category');
      onCategoryChange(category);
    });
  });
  
  return container;
}
