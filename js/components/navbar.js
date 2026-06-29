// Navbar component

export function initNavbar(onNavigate) {
  const navItems = document.querySelectorAll('.nav-item');
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
  
  // Set up click handlers for top navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const sectionId = e.currentTarget.getAttribute('data-section');
      if (sectionId) {
        onNavigate(sectionId);
      }
    });
  });

  // Mobile menu hamburger toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.querySelector('aside');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      
      // Update hamburger accessibility & state
      const isOpen = sidebar.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.classList.toggle('active');
    });
    
    // Close sidebar on document click (for mobile)
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
    
    // Close sidebar when sidebar link is clicked
    sidebarNavItems.forEach(item => {
      item.addEventListener('click', () => {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // Scroll spy to highlight active section in navbar
  window.addEventListener('scroll', () => {
    let current = 'hero';
    const scrollPos = window.scrollY + 100; // Offset for header
    
    const sections = ['hero', 'guide', 'ecosystem', 'tutorials', 'trends'];
    
    sections.forEach(secId => {
      const el = document.getElementById(secId);
      if (el && scrollPos >= el.offsetTop) {
        current = secId;
      }
    });
    
    updateActiveStates(current);
  });
}

export function updateActiveStates(activeSectionId) {
  // Update Navbar
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-section') === activeSectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update Sidebar (if matched)
  const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
  sidebarItems.forEach(item => {
    if (item.getAttribute('data-section') === activeSectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
