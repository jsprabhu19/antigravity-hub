# 🚀 Antigravity & Google AI Ecosystem — Interactive Learning Hub

A premium, animation-rich web application that serves as the definitive guide to Google Antigravity and the broader Google AI ecosystem, featuring interactive tutorials, smart examples, and a real-time AI trends tracker.

## 🛠️ Tech Stack & Architecture

- **Bundler**: [Vite](https://vite.dev/) (Vite 8)
- **Frontend**: Vanilla ES6 JavaScript (Zero framework overhead)
- **Animation Engine**: [GSAP](https://gsap.com/) (GreenSock Animation Platform) + ScrollTrigger for scroll-based transitions
- **Styles**: Custom CSS Custom Properties (Design Token System) with premium Glassmorphism layouts, glowing accents, and responsive grids
- **Icons**: Custom SVG icons embedded inline
- **Deployment**: Configured for instant deployment on [Vercel](https://vercel.com/) with SPA rewriting rules and edge caching headers

## 🌟 Key Features

1. **Cinematic Hero**: Canvas-based particle constellation system with typewriter reveal heading and real-time stats count-up animations.
2. **Antigravity Feature Guide**: Glassmorphism cards that expand on click using GSAP transition timelines, providing details on:
   - Antigravity CLI (`agy`) keyboard shortcuts & slash commands
   - Desktop App 2.0 sidebar layout & subagents
   - VS Code IDE Integration & inline code lenses
   - Python SDK Agent Lease API & custom tool decorators
   - Skills & Plugins directories (including 40+ science integrations)
   - Rules configurations (`AGENTS.md`) and Model Context Protocol (MCP) servers
3. **Google AI Ecosystem Map**: Concentric orbital diagram positioning models, agents, tools, and infrastructure in orbits, mapping connections between related products.
4. **Interactive Sandbox Stepper**: Step-by-step vertical timeline tutorial wizard with copy-to-clipboard buttons, syntax-highlighted code blocks, and custom canvas-based particle confetti celebrations.
5. **Trends Tracker**: Curated Masonry-like grid feed of the latest AI trends with high/medium/low impact badges and instant tutorial redirection.
6. **Command Palette Fuzzy Search**: Globally accessible (`Ctrl + K` or `Cmd + K`) overlay modal supporting keyboard-friendly fuzzy search results grouped by category.

## 📦 Project Directory

```
antigravity-hub/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline
├── public/
│   └── favicon.svg               # Brand favicon
├── js/
│   ├── app.js                    # Core Application state controller
│   ├── animations.js             # GSAP ScrollTrigger timeline manager
│   ├── components/
│   │   ├── navbar.js             # Sticky top navigation
│   │   ├── sidebar.js            # Collapsible tree sidebar
│   │   ├── hero.js               # Canvas particle and stats counter
│   │   ├── feature-card.js       # Dynamic grid cards and details drawer
│   │   ├── code-block.js         # Custom code syntax highlighter
│   │   ├── tutorial-stepper.js   # Step timeline and confetti manager
│   │   ├── trends-feed.js        # Masonry trends cards with filters
│   │   ├── search-bar.js         # Command palette modal
│   │   └── toast.js              # Overlay toast manager
│   └── data/
│       ├── antigravity-guide.js  # Antigravity interface descriptions
│       ├── ecosystem-data.js     # Orbital products directory
│       ├── tutorials.js          # Interactive walkthrough steps
│       └── trends.js             # Curated AI developments
├── index.html                    # Main layout container
├── style.css                     # Global Design system tokens & utility classes
├── vercel.json                   # Vercel hosting rewrites & headers
├── package.json                  # Dependencies
├── vite.config.js                # Vite bundler parameters
└── README.md                     # Documentation
```

## 🚀 Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```

3. **Verify Production Build**:
   ```bash
   npm run build
   npm run preview
   ```

## 🚢 CI/CD & Deployments

- **CI/CD Pipeline**: Commits pushed to `main` trigger a GitHub Action compiling assets and launching verification tests.
- **Vercel Deploy**: Linked repos deploy automatically on Vercel. Static assets are served with a 1-year immutable caching header (`Cache-Control: public, max-age=31536000, immutable`).
