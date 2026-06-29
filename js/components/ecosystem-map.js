// Ecosystem Map Concentric Ring Orbit Component
import gsap from 'gsap';

export function renderEcosystemMap(products, activeProductId, onNodeSelect) {
  const container = document.createElement('div');
  container.className = 'ecosystem-container';
  
  container.innerHTML = `
    <div class="orbital-viewport">
      <svg class="connections-svg" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:5;"></svg>
      
      <!-- Concentric Orbit Lines -->
      <div class="orbit-ring ring-models"></div>
      <div class="orbit-ring ring-agents"></div>
      <div class="orbit-ring ring-tools"></div>
      <div class="orbit-ring ring-infrastructure"></div>
      
      <div class="orbital-center">Google AI</div>
      <div class="nodes-container" style="position:absolute; width:100%; height:100%; top:0; left:0;"></div>
    </div>
    
    <div class="ecosystem-info-panel">
      <!-- Detail panel gets injected here -->
    </div>
  `;
  
  const viewport = container.querySelector('.orbital-viewport');
  const svg = container.querySelector('.connections-svg');
  const nodesContainer = container.querySelector('.nodes-container');
  const infoPanel = container.querySelector('.ecosystem-info-panel');
  
  // 1. Group products by concentric rings (categories)
  const rings = {
    "Models": { radius: 70, class: "ring-models", color: "var(--accent-purple)", nodes: [] },
    "Agents": { radius: 120, class: "ring-agents", color: "var(--accent-green)", nodes: [] },
    "Tools": { radius: 170, class: "ring-tools", color: "var(--accent-amber)", nodes: [] },
    "Infrastructure": { radius: 220, class: "ring-infrastructure", color: "var(--accent-cyan)", nodes: [] }
  };
  
  // Fallback for missing/different categories
  products.forEach(p => {
    let cat = p.category;
    if (cat === 'Platforms') cat = 'Tools'; // Merge Platforms into Tools ring
    if (!rings[cat]) cat = 'Infrastructure';
    rings[cat].nodes.push(p);
  });
  
  // 2. Position nodes around the center
  const centerX = 250; // Viewport center estimate (we will read viewport dimensions on draw)
  const centerY = 250;
  
  const nodeElements = {};
  
  // We will position nodes using trigonometric calculations
  Object.keys(rings).forEach(category => {
    const ring = rings[category];
    const numNodes = ring.nodes.length;
    if (numNodes === 0) return;
    
    const angleStep = (2 * Math.PI) / numNodes;
    
    ring.nodes.forEach((node, idx) => {
      const angle = idx * angleStep;
      const x = centerX + ring.radius * Math.cos(angle) - 22; // half of node size 44px
      const y = centerY + ring.radius * Math.sin(angle) - 22;
      
      const nodeDiv = document.createElement('div');
      nodeDiv.className = `ecosystem-node ${node.id === activeProductId ? 'active' : ''}`;
      nodeDiv.style.left = `${x}px`;
      nodeDiv.style.top = `${y}px`;
      nodeDiv.setAttribute('data-id', node.id);
      nodeDiv.setAttribute('data-category', category);
      nodeDiv.title = node.name;
      
      // Realtime equivalent custom icons mapping for each product ID
      const customIcons = {
        "gemini-flash": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color:var(--accent-blue);"><path d="M12 2a.75.75 0 0 1 .75.75c0 4.14 3.36 7.5 7.5 7.5a.75.75 0 0 1 0 1.5c-4.14 0-7.5 3.36-7.5 7.5a.75.75 0 0 1-1.5 0c0-4.14-3.36-7.5-7.5-7.5a.75.75 0 0 1 0-1.5c4.14 0 7.5-3.36 7.5-7.5A.75.75 0 0 1 12 2Z" /></svg>`,
        "gemini-omni": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color:var(--accent-purple);"><path d="M12 2a.75.75 0 0 1 .75.75c0 4.14 3.36 7.5 7.5 7.5a.75.75 0 0 1 0 1.5c-4.14 0-7.5 3.36-7.5 7.5a.75.75 0 0 1-1.5 0c0-4.14-3.36-7.5-7.5-7.5a.75.75 0 0 1 0-1.5c4.14 0 7.5-3.36 7.5-7.5A.75.75 0 0 1 12 2Z" /></svg>`,
        "gemini-spark": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-green);"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" /></svg>`,
        "vertex-ai": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-cyan);"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`,
        "ai-studio": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-amber);"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
        "firebase-ai": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-orange);"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>`,
        "notebook-lm": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-purple);"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>`,
        "codemender": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-blue);"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>`,
        "webmcp": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-cyan);"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v3.75a3 3 0 0 1-3 3m-13.5 0a3 3 0 0 0-3 3v3.75a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V17.25a3 3 0 0 0-3-3M6.75 7.5h.008v.008H6.75V7.5Zm0 9h.008v.008H6.75v-.008Zm10.5-9h.008v.008h-.008V7.5Zm0 9h.008v.008h-.008v-.008Z" /></svg>`,
        "android-ai": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent-green);"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" /></svg>`
      };

      const icon = customIcons[node.id] || (category === 'Models'
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v3.375c0 .621.504 1.125 1.125 1.125h3.375a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 1-.75-.75V6Z" /></svg>`
        : category === 'Agents'
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>`
        : category === 'Tools'
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.65 2.65 0 0 0 21 17.25l-5.83-5.83m-3.75 3.75-3.75-3.75m3.75 3.75-3.493-3.493A3.125 3.125 0 1 1 14.49 4.01l3.493 3.493m0 0a3.125 3.125 0 0 1-4.417 4.417L9.97 8.53m3.75 3.75-3.75 3.75M9.97 8.53H4.847a.75.75 0 0 0-.51.205L2.22 10.852a.75.75 0 0 0-.22.53v3.743c0 .199.079.39.22.53l2.117 2.118a.75.75 0 0 0 .51.205h5.122A2.25 2.25 0 0 0 12.5 16.03V10.97A2.25 2.25 0 0 0 9.97 8.53Z" /></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3.75h.008v.008h-.008V3.75Z" /></svg>`
      );
      
      nodeDiv.innerHTML = icon;
      nodesContainer.appendChild(nodeDiv);
      
      nodeElements[node.id] = {
        element: nodeDiv,
        x: x + 22,
        y: y + 22,
        data: node
      };
      
      // Event: Selection
      nodeDiv.addEventListener('click', () => {
        onNodeSelect(node.id);
      });
      
      // Event: Hover Highlight connections
      nodeDiv.addEventListener('mouseenter', () => {
        highlightConnections(node.id);
      });
      
      nodeDiv.addEventListener('mouseleave', () => {
        clearHighlights();
      });
    });
  });
  
  // 3. Draw connection lines
  function drawLines() {
    svg.innerHTML = '';
    const activeId = container.querySelector('.ecosystem-node.active')?.getAttribute('data-id');
    
    products.forEach(source => {
      const sourceNode = nodeElements[source.id];
      if (!sourceNode) return;
      
      source.connections.forEach(targetId => {
        const targetNode = nodeElements[targetId];
        if (!targetNode) return;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", sourceNode.x);
        line.setAttribute("y1", sourceNode.y);
        line.setAttribute("x2", targetNode.x);
        line.setAttribute("y2", targetNode.y);
        
        // Highlight active connections
        if (activeId && (source.id === activeId || targetId === activeId)) {
          line.setAttribute("stroke", "var(--accent-blue)");
          line.setAttribute("stroke-width", "2");
          line.setAttribute("stroke-dasharray", "4,4");
          
          // Animate pulsing dash
          const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animate.setAttribute("attributeName", "stroke-dashoffset");
          animate.setAttribute("values", "20;0");
          animate.setAttribute("dur", "1s");
          animate.setAttribute("repeatCount", "indefinite");
          line.appendChild(animate);
        } else {
          line.setAttribute("stroke", "rgba(255,255,255,0.04)");
          line.setAttribute("stroke-width", "1");
        }
        
        svg.appendChild(line);
      });
    });
  }
  
  function highlightConnections(nodeId) {
    const p = products.find(prod => prod.id === nodeId);
    if (!p) return;
    
    const targets = p.connections;
    
    // Dim all nodes except source & targets
    Object.keys(nodeElements).forEach(id => {
      if (id === nodeId || targets.includes(id)) {
        nodeElements[id].element.style.opacity = '1';
        nodeElements[id].element.style.transform = 'scale(1.1)';
      } else {
        nodeElements[id].element.style.opacity = '0.25';
      }
    });
    
    // Highlight lines connected to this node
    const lines = svg.querySelectorAll('line');
    lines.forEach(line => {
      const x1 = parseFloat(line.getAttribute('x1'));
      const y1 = parseFloat(line.getAttribute('y1'));
      const x2 = parseFloat(line.getAttribute('x2'));
      const y2 = parseFloat(line.getAttribute('y2'));
      
      const nodeX = nodeElements[nodeId].x;
      const nodeY = nodeElements[nodeId].y;
      
      const isConnected = (x1 === nodeX && y1 === nodeY) || (x2 === nodeX && y2 === nodeY);
      
      if (isConnected) {
        line.setAttribute("stroke", "var(--accent-purple)");
        line.setAttribute("stroke-width", "2");
      }
    });
  }
  
  function clearHighlights() {
    Object.keys(nodeElements).forEach(id => {
      nodeElements[id].element.style.opacity = '';
      nodeElements[id].element.style.transform = '';
    });
    drawLines();
  }
  
  // 4. Render details panel
  function updateDetailPanel() {
    const activeNode = products.find(p => p.id === activeProductId);
    infoPanel.innerHTML = '';
    
    if (!activeNode) {
      infoPanel.innerHTML = `
        <div class="eco-no-selection">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 9.152c.582.448 1.148.89 1.676 1.345m-1.676-1.345c-.528-.407-1.125-.805-1.783-1.181m1.783 1.181a49.002 49.002 0 0 0-4.66 3.045m0 0a48.97 48.97 0 0 0-4.66-3.045m4.66 3.045c-.528-.407-1.125-.805-1.783-1.181m1.783 1.181c.582.448 1.148.89 1.676 1.345M6.78 19.5H17.22c.983 0 1.78-.775 1.78-1.75V6.75C19 5.775 18.203 5 17.22 5H6.78C5.797 5 5 5.775 5 6.75v11c0 .975.797 1.75 1.78 1.75Z" /></svg>
          <p>Select a node in the orbit to view ecosystem integrations and capabilities.</p>
        </div>
      `;
      return;
    }
    
    const catClass = activeNode.category.toLowerCase();
    const connChips = activeNode.connections.map(cId => {
      const matched = products.find(p => p.id === cId);
      return `<span class="eco-conn-chip">${matched ? matched.name : cId}</span>`;
    }).join('');
    
    infoPanel.innerHTML = `
      <div class="eco-details">
        <div class="eco-header">
          <span class="eco-name">${activeNode.name}</span>
          <span class="eco-cat-badge ${catClass}">${activeNode.category}</span>
        </div>
        <p class="eco-desc">${activeNode.description}</p>
        <div>
          <div class="eco-more-title">Core Capability</div>
          <div class="eco-more">${activeNode.details}</div>
        </div>
        <div class="eco-connections">
          <div class="eco-more-title">Ecosystem Connections</div>
          <div class="eco-conn-list">
            ${connChips}
          </div>
        </div>
      </div>
    `;
    
    // Entrance animation for panel
    gsap.fromTo(infoPanel.querySelector('.eco-details'),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
    );
  }
  
  // Initial draw
  setTimeout(() => {
    drawLines();
    updateDetailPanel();
  }, 100);
  
  return container;
}
