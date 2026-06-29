// Sidebar component

export function initSidebar(onNavigate) {
  const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
  
  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const sectionId = e.currentTarget.getAttribute('data-section');
      if (sectionId) {
        onNavigate(sectionId);
      }
    });
  });
}
