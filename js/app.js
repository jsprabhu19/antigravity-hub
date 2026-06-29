// Main Application Controller
import { antigravityGuideData } from './data/antigravity-guide.js';
import { ecosystemData } from './data/ecosystem-data.js';
import { tutorialsData } from './data/tutorials.js';
import { trendsData } from './data/trends.js';
import { ideasData } from './data/ideas-data.js';

import { initAnimations } from './animations.js';
import { initHero } from './components/hero.js';
import { initNavbar, updateActiveStates } from './components/navbar.js';
import { initSidebar } from './components/sidebar.js';
import { renderFeatureCard, renderFeatureDetails } from './components/feature-card.js';
import { renderEcosystemMap } from './components/ecosystem-map.js';
import { renderTutorialsList, renderTutorialStepper } from './components/tutorial-stepper.js';
import { renderTrendsFeed } from './components/trends-feed.js';
import { initSearchPalette } from './components/search-bar.js';
import { renderIdeasGenerator } from './components/ideas-generator.js';
import { initThemeToggle } from './components/theme-toggle.js';
import { showToast } from './components/toast.js';
import { renderDocsBrowser } from './components/docs.js';

// Application State
const state = {
  activeGuideId: null,
  activeEcosystemId: 'gemini-flash',
  activeTutorialId: 'first-agy-session',
  activeTutorialStep: 0,
  activeTrendCategory: 'All',
  activeIdeaFilters: { level: 'Beginner', category: 'All' },
  activeDocsPageId: 'welcome',
  completedTutorials: JSON.parse(localStorage.getItem('completed_tutorials')) || []
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize core system utilities & animations
  initAnimations();
  initHero();
  initThemeToggle();
  
  // Wire navigation triggers
  initNavbar(navigateToSection);
  initSidebar(navigateToSection);
  
  // Initialize Search Command Palette
  initSearchPalette({
    features: antigravityGuideData,
    tutorials: tutorialsData,
    trends: trendsData.trends
  }, handleSearchResultSelect);
  
  // 2. Render initial static and dynamic parts
  renderGuideCards();
  renderEcosystem();
  renderIdeas();
  renderTutorials();
  renderTrends();
  renderDocs();
  
  // Reset Progress Event Handler
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your completion progress and search history?')) {
        localStorage.removeItem('completed_tutorials');
        localStorage.removeItem('recent_searches');
        ideasData.forEach(idea => {
          localStorage.removeItem(`idea_progress_${idea.id}`);
        });
        
        state.completedTutorials = [];
        state.activeTutorialId = 'first-agy-session';
        state.activeTutorialStep = 0;
        state.activeIdeaFilters = { level: 'Beginner', category: 'All' };
        
        renderIdeas();
        renderTutorials();
        showToast('All progress has been reset.', 'info');
      }
    });
  }
  
  // 3. Process initial hash route if present
  handleHashRoute();
  window.addEventListener('hashchange', handleHashRoute);
});

// Navigation orchestrator helper
function navigateToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, null, `#${sectionId}`);
    updateActiveStates(sectionId);
  }
}

// Router for direct link sharing
function handleHashRoute() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    // If routing to a major section
    const sections = ['hero', 'guide', 'ecosystem', 'ideas', 'tutorials', 'trends', 'docs'];
    if (sections.includes(hash)) {
      navigateToSection(hash);
    }
  }
}

// Result select handler from command palette
function handleSearchResultSelect(result) {
  if (result.targetSection) {
    navigateToSection(result.targetSection);
  }
  
  if (result.type === 'feature') {
    state.activeGuideId = result.id;
    renderGuideCards(); // Redraws to expand details
  } else if (result.type === 'tutorial') {
    state.activeTutorialId = result.id;
    state.activeTutorialStep = 0;
    renderTutorials();
  } else if (result.type === 'trend') {
    // Scroll trend card into view and flash it
    setTimeout(() => {
      const card = document.querySelector(`.trend-card[data-id="${result.id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.borderColor = 'var(--accent-purple)';
        card.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.4)';
        setTimeout(() => {
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }, 3000);
      }
    }, 500);
  }
}

// Render Antigravity Guide features
function renderGuideCards() {
  const grid = document.getElementById('guide-grid');
  const detailsWrapper = document.getElementById('guide-details-wrapper');
  
  if (!grid || !detailsWrapper) return;
  
  grid.innerHTML = '';
  
  antigravityGuideData.forEach(item => {
    const card = renderFeatureCard(item, (selectedItem) => {
      state.activeGuideId = selectedItem.id;
      renderGuideCards();
      
      // Auto scroll to details
      setTimeout(() => {
        detailsWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
    
    // Highlight if active
    if (item.id === state.activeGuideId) {
      card.classList.add('active');
    }
    
    grid.appendChild(card);
  });
  
  // Render details panel if activeGuideId is set
  detailsWrapper.innerHTML = '';
  if (state.activeGuideId) {
    const activeData = antigravityGuideData.find(item => item.id === state.activeGuideId);
    if (activeData) {
      const detailsElement = renderFeatureDetails(activeData, () => {
        state.activeGuideId = null;
        renderGuideCards();
      });
      detailsWrapper.appendChild(detailsElement);
    }
  }
}

// Render Google AI Ecosystem Map
function renderEcosystem() {
  const mapWrapper = document.getElementById('ecosystem-map-wrapper');
  if (!mapWrapper) return;
  
  mapWrapper.innerHTML = '';
  
  const mapElement = renderEcosystemMap(ecosystemData, state.activeEcosystemId, (selectedNodeId) => {
    state.activeEcosystemId = selectedNodeId;
    renderEcosystem();
  });
  
  mapWrapper.appendChild(mapElement);
}

// Render Interactive Ideas Generator
function renderIdeas() {
  const ideasWrapper = document.getElementById('ideas-generator-wrapper');
  if (!ideasWrapper) return;
  
  ideasWrapper.innerHTML = '';
  
  const ideasElement = renderIdeasGenerator(
    ideasData,
    state.activeIdeaFilters,
    (filterType, filterVal) => {
      if (filterType === 'level') {
        state.activeIdeaFilters.level = filterVal;
      } else {
        state.activeIdeaFilters.category = filterVal;
      }
      renderIdeas();
    }
  );
  
  ideasWrapper.appendChild(ideasElement);
}

// Render Interactive Tutorials
function renderTutorials() {
  const tutorialsWrapper = document.getElementById('tutorials-layout-wrapper');
  if (!tutorialsWrapper) return;
  
  tutorialsWrapper.innerHTML = '';
  
  const activeTutorial = tutorialsData.find(t => t.id === state.activeTutorialId);
  if (!activeTutorial) return;
  
  // Create sidebar list (pass completed list)
  const listElement = renderTutorialsList(tutorialsData, state.activeTutorialId, state.completedTutorials, (selectedId) => {
    state.activeTutorialId = selectedId;
    state.activeTutorialStep = 0;
    renderTutorials();
  });
  
  // Create stepper timeline view
  const stepperElement = renderTutorialStepper(
    activeTutorial, 
    state.activeTutorialStep,
    (newStepIdx) => {
      state.activeTutorialStep = newStepIdx;
      renderTutorials();
    },
    () => {
      // Completed! Add to completed list and save
      if (!state.completedTutorials.includes(activeTutorial.id)) {
        state.completedTutorials.push(activeTutorial.id);
        localStorage.setItem('completed_tutorials', JSON.stringify(state.completedTutorials));
      }
      
      // Re-render immediately to update checkmarks
      renderTutorials();
      
      // Switch to next tutorial if available
      const currentIdx = tutorialsData.findIndex(t => t.id === state.activeTutorialId);
      if (currentIdx < tutorialsData.length - 1) {
        state.activeTutorialId = tutorialsData[currentIdx + 1].id;
        state.activeTutorialStep = 0;
        setTimeout(() => renderTutorials(), 2500); // 2.5s delay to show confetti
      }
    }
  );
  
  tutorialsWrapper.appendChild(listElement);
  tutorialsWrapper.appendChild(stepperElement);
}

// Render Trends Feed
function renderTrends() {
  const trendsWrapper = document.getElementById('trends-feed-wrapper');
  if (!trendsWrapper) return;
  
  trendsWrapper.innerHTML = '';
  
  const feedElement = renderTrendsFeed(
    trendsData.trends, 
    state.activeTrendCategory,
    (selectedCategory) => {
      state.activeTrendCategory = selectedCategory;
      renderTrends();
    },
    (tutorialId) => {
      // Map trend tutorial to active tutorial run
      state.activeTutorialId = tutorialId;
      state.activeTutorialStep = 0;
      renderTutorials();
      navigateToSection('tutorials');
    }
  );
  
  trendsWrapper.appendChild(feedElement);
}

// Render Antigravity Documentation Browser
function renderDocs() {
  const wrapper = document.getElementById('docs-browser-wrapper');
  if (!wrapper) return;
  
  wrapper.innerHTML = '';
  const browser = renderDocsBrowser(state.activeDocsPageId, (selectedPageId) => {
    state.activeDocsPageId = selectedPageId;
    renderDocs();
  });
  wrapper.appendChild(browser);
}
