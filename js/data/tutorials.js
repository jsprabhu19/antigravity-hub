export const tutorialsData = [
  {
    id: "first-agy-session",
    title: "Your First agy Session",
    surface: "CLI",
    level: "Beginner",
    description: "Learn how to launch the Antigravity TUI, interact with the agent, and run simple diagnostic tasks.",
    steps: [
      {
        title: "Launch the CLI",
        instruction: "Open your terminal and run `agy` in your project folder. This initializes a workspace-aware chat session.",
        code: "agy",
        language: "bash",
        output: "Initializing Antigravity Hub workspace...\nLeasing agent [gemini-3.5-flash]... Done.\nAntigravity TUI v2.0 loaded. Type /help for keybindings."
      },
      {
        title: "Ask your first coding question",
        instruction: "Type a prompt in the Prompt Bar (bottom panel) to ask the agent to list your workspace files.",
        code: "What files are currently in my directory?",
        language: "text",
        output: "Antigravity Agent: I have analyzed the directory. Here is the list of files:\n- package.json\n- index.html\n- artifacts/ (directory)"
      },
      {
        title: "Exit the session",
        instruction: "To close the TUI and release the leased agent, simply type `exit` or press `Ctrl + C`.",
        code: "exit",
        language: "text",
        output: "Releasing agent lease...\nSession closed. Goodbye!"
      }
    ]
  },
  {
    id: "spawning-subagents",
    title: "Spawning Subagents",
    surface: "App 2.0",
    level: "Intermediate",
    description: "Learn how to trigger specialized subagents for parallel task execution and inspect their logs.",
    steps: [
      {
        title: "Create a subagent request",
        instruction: "In the chat input, request the agent to delegate the research task to a subagent.",
        code: "Create a subagent to search arXiv for recent papers on multi-agent collaboration.",
        language: "text",
        output: "Antigravity Agent: Spawning research subagent with tasks: [search arXiv]..."
      },
      {
        title: "Monitor subagent progress",
        instruction: "Look at the Auxiliary Pane (right sidebar) in the Subagents tab to see the subagent's status, active tool calls, and execution logs in real-time.",
        code: "# Visual log displayed in right pane:\n[Subagent 1: Active] Running literature-search-arxiv on 'multi-agent collaboration'...",
        language: "bash",
        output: "[Subagent 1: Success] Retrieved 5 papers. Saving summary to research_notes.md."
      }
    ]
  },
  {
    id: "building-custom-skill",
    title: "Building a Custom Skill",
    surface: "Skills",
    level: "Advanced",
    description: "Package a specific workflow into a reusable skill with custom instructions and supporting scripts.",
    steps: [
      {
        title: "Create the skill structure",
        instruction: "Create a directory under `.agents/skills/my-skill/` and write a `SKILL.md` file detailing the instructions.",
        code: "mkdir -p .agents/skills/css-audit\ntouch .agents/skills/css-audit/SKILL.md",
        language: "bash",
        output: ""
      },
      {
        title: "Define the SKILL.md",
        instruction: "Add YAML frontmatter to register the skill name and description, followed by the execution guide for the agent.",
        code: `---
name: css-audit
description: Scans style.css for unused classes and accessibility issues
---

# Instructions
1. Run \`npm run lint:css\` to list issues.
2. Verify all color tokens are in high contrast.
3. Propose fixes in a stylesheet diff.`,
        language: "yaml",
        output: "Skill 'css-audit' registered successfully."
      },
      {
        title: "Test skill discovery",
        instruction: "Run the CLI. The agent will auto-discover the skill during startup. Ask the agent to run the audit.",
        code: "agy \"Audit style.css using the css-audit skill\"",
        language: "bash",
        output: "Found skill 'css-audit' in .agents/skills/\nExecuting css-audit guidelines...\nCSS audit complete. Found 2 contrast issues."
      }
    ]
  },
  {
    id: "mcp-server-integration",
    title: "MCP Server Integration",
    surface: "Advanced",
    level: "Advanced",
    description: "Connect a Model Context Protocol server to expose custom databases and APIs to the agent.",
    steps: [
      {
        title: "Configure the server",
        instruction: "Open your MCP configuration file (`~/.antigravity/mcp_config.json`) and add the server definition.",
        code: `{
  "mcpServers": {
    "postgres-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "--connection", "postgresql://localhost:5432/dev"]
    }
  }
}`,
        language: "json",
        output: ""
      },
      {
        title: "Initialize connection",
        instruction: "Run `agy` to load the workspace. The agent will discover the PostgreSQL MCP server and list its available tools.",
        code: "agy",
        language: "bash",
        output: "Loaded MCP servers: [postgres-db]\nRegistered postgres-db tools: [query_db, get_schema, list_tables]"
      },
      {
        title: "Execute a query",
        instruction: "Ask the agent to query the database using the newly loaded MCP tools.",
        code: "Query the active users count from the last 24 hours.",
        language: "text",
        output: "Calling tool: postgres-db/query_db with args { query: 'SELECT COUNT(*) FROM users WHERE last_login > NOW() - INTERVAL \\'1 day\\'' }\nResult: 1,420 active users."
      }
    ]
  },
  {
    id: "browser-automation",
    title: "Browser Automation Testing",
    surface: "Advanced",
    level: "Intermediate",
    description: "Command the agent to run browser sessions, capture screenshots, and test user interactions.",
    steps: [
      {
        title: "Initiate browser automation",
        instruction: "Instruct the agent to open a URL and take a screenshot of the landing page.",
        code: "Launch browser, open http://localhost:5173, and capture a screenshot of the hero section",
        language: "text",
        output: "Initializing browser subagent...\nNavigating to http://localhost:5173...\nCaptured screenshot: hero_section.png (Saved to artifacts/)"
      },
      {
        title: "Simulate click events",
        instruction: "Tell the agent to click the 'Explore Trends' button and verify the page scroll.",
        code: "Click the button with text 'Explore Trends' and verify the viewport scroll position.",
        language: "text",
        output: "Clicking element: button#explore-trends\nViewport scrolled to section: #trends-feed. Success."
      }
    ]
  },
  {
    id: "creating-rules",
    title: "Creating Rules & Customizations",
    surface: "Advanced",
    level: "Beginner",
    description: "Define guidelines in AGENTS.md to enforce coding standards and workflow conventions.",
    steps: [
      {
        title: "Create AGENTS.md file",
        instruction: "Add an `AGENTS.md` file in the `.agents` folder in your workspace root.",
        code: "mkdir -p .agents\ntouch .agents/AGENTS.md",
        language: "bash",
        output: ""
      },
      {
        title: "Add coding rules",
        instruction: "Write down instructions that the agent must strictly follow for all file modifications.",
        code: `## JavaScript Rules
- Always use ES6 modules (export/import)
- Never use 'var'; always use 'const' or 'let'
- Use descriptive variable names (camelCase)
- Include JSDoc comments for all main functions`,
        language: "markdown",
        output: ""
      },
      {
        title: "Verify rule compliance",
        instruction: "Ask the agent to write a helper function. Notice how it follows the rules outlined in `AGENTS.md`.",
        code: "Write a function to format currency in USD.",
        language: "text",
        output: `/**
 * Formats a numeric value into a USD currency string.
 * @param {number} value - The numeric amount.
 * @returns {string} The formatted currency.
 */
export const formatUSD = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};`
      }
    ]
  },
  {
    id: "using-python-sdk",
    title: "Using the Python SDK",
    surface: "SDK",
    level: "Intermediate",
    description: "Write Python scripts to lease agents, run prompt completions, and handle structured tool execution.",
    steps: [
      {
        title: "Install the SDK",
        instruction: "Add `antigravity-sdk` to your Python virtual environment requirements.",
        code: "pip install antigravity-sdk",
        language: "bash",
        output: "Successfully installed antigravity-sdk-1.0.0"
      },
      {
        title: "Write a basic agent script",
        instruction: "Create a Python file and lease an agent to generate documentation for a module.",
        code: `import antigravity as ag

# Lease agent programmatically
with ag.AgentLease(model="gemini-3.5-flash") as agent:
    response = agent.chat("Explain the concept of quantum superposition in one sentence.")
    print(response.text)`,
        language: "python",
        output: "Quantum superposition is the principle that a physical system exists in multiple states simultaneously until it is measured."
      }
    ]
  },
  {
    id: "background-task-management",
    title: "Background Task Management",
    surface: "CLI",
    level: "Intermediate",
    description: "Launch builds or test runners as background tasks and inspect their logs asynchronously.",
    steps: [
      {
        title: "Run a long-running process",
        instruction: "Instruct the agent to launch the Vite development server in the background.",
        code: "Run 'npm run dev' in the background.",
        language: "text",
        output: "Proposing command: npm run dev\n[Task Started] ID: task-901 (Sent to background)"
      },
      {
        title: "Manage background tasks",
        instruction: "Use the `manage_task` command to check status, send input, or terminate background processes.",
        code: "agy \"/tasks list\"",
        language: "bash",
        output: "Active Background Tasks:\n- ID: task-901 | Command: npm run dev | Status: Running | Log: logs/task-901.log"
      },
      {
        title: "Check logs",
        instruction: "Ask the agent to display the output logs of the background task.",
        code: "agy \"/tasks status task-901\"",
        language: "bash",
        output: "Vite v6.0.0 dev server running at:\n  > Local: http://localhost:5173/"
      }
    ]
  },
  {
    id: "science-skills",
    title: "Science Skills Deep Dive",
    surface: "Skills",
    level: "Advanced",
    description: "Leverage scientific databases (AlphaFold, PubMed, ChEMBL) to query structure and literature models.",
    steps: [
      {
        title: "Search for a clinical trial",
        instruction: "Use the clinical-trials-database skill to search for active trials targeting a specific disease.",
        code: "Search clinical trials for leukemia phase 3 recruiting in New York",
        language: "text",
        output: "Calling clinical-trials-database API...\nFound 3 recruiting phase 3 trials in New York:\n1. NCT04526322 (Sponsor: Pfizer)\n2. NCT05012351 (Sponsor: Novartis)..."
      },
      {
        title: "Fetch protein details",
        instruction: "Query UniProt for functional annotations and sequence parameters.",
        code: "Fetch details for protein accession P68871 (Beta-globin)",
        language: "text",
        output: "Calling uniprot-database skill...\nProtein: Hemoglobin subunit beta\nGene: HBB\nFunction: Involved in oxygen transport from lungs to tissues."
      }
    ]
  },
  {
    id: "firebase-deployment",
    title: "Deploying with Firebase AI",
    surface: "Ecosystem",
    level: "Intermediate",
    description: "Configure Firebase hosting and deploy the static app using CLI commands.",
    steps: [
      {
        title: "Initialize Firebase Hosting",
        instruction: "Run the Firebase initialization command in non-interactive mode.",
        code: "firebase init hosting --project default-sandbox",
        language: "bash",
        output: "Writing firebase.json...\nWriting .firebaserc...\nInitialization complete!"
      },
      {
        title: "Deploy the app",
        instruction: "Compile your production assets and deploy the public folder to Firebase CDN.",
        code: "npm run build && firebase deploy --only hosting",
        language: "bash",
        output: "Hosting URL: https://default-sandbox.web.app\nDeploy complete!"
      }
    ]
  },
  {
    id: "shortcuts-mastery",
    title: "Keyboard Shortcuts Mastery",
    surface: "CLI",
    level: "Beginner",
    description: "Accelerate your workflow by navigating the terminal user interface without reaching for your mouse.",
    steps: [
      {
        title: "Split focus to Chat Pane",
        instruction: "Press `Tab` to cycle between the Chat Panel, the Prompt Bar, and the Auxiliary Pane.",
        code: "Press [Tab]",
        language: "text",
        output: "Active focus: Chat Panel. (Scrollbar glowing)"
      },
      {
        title: "Scroll logs asynchronously",
        instruction: "Use `Ctrl + J` and `Ctrl + K` to scroll up and down the console history without leaving the input bar.",
        code: "Press [Ctrl + J]",
        language: "text",
        output: "Scrolled chat log up 10 lines."
      }
    ]
  },
  {
    id: "permissions-security",
    title: "Agent Permissions & Security",
    surface: "Advanced",
    level: "Advanced",
    description: "Understand the permission scoping rules for reading external resources and executing shell scripts.",
    steps: [
      {
        title: "Request a restricted resource",
        instruction: "Ask the agent to fetch content from an external domain not listed in sandbox rules.",
        code: "Fetch release notes from https://api.github.com/repos/google/antigravity/releases",
        language: "text",
        output: "[Permission Required] Action: read_url | Target: api.github.com\nDo you want to grant this permission? [Y/n]"
      },
      {
        title: "Audit permissions list",
        instruction: "View active permission grants in the session configuration.",
        code: "agy \"/permissions list\"",
        language: "bash",
        output: "Granted Permissions:\n- Action: read_file | Target: /workspace\n- Action: read_url | Target: api.github.com"
      }
    ]
  },
  {
    id: "slash-commands",
    title: "Slash Commands Power Guide",
    surface: "CLI",
    level: "Beginner",
    description: "Learn how slash commands speed up operations like planning, scheduling, and learning.",
    steps: [
      {
        title: "Call the goal command",
        instruction: "Trigger deep-execution mode by prepending `/goal` to your instructions.",
        code: "/goal refactor all utils and write comprehensive unit tests",
        language: "text",
        output: "[Goal Mode Activated] Planning task...\nWriting implementation plan to artifacts/..."
      },
      {
        title: "Call the grill-me command",
        instruction: "Ask the agent to conduct a design interview to clarify ambiguous requirements.",
        code: "/grill-me implement auth middleware",
        language: "text",
        output: "Antigravity Interviewer:\n1. Which authentication provider should we use (JWT, OAuth2)?\n2. Should we block non-HTTPS requests by default?"
      }
    ]
  },
  {
    id: "artifact-workflow",
    title: "Artifact Creation Workflow",
    surface: "App 2.0",
    level: "Intermediate",
    description: "Work with persistent artifacts to document project architecture, database schemas, or deployment plans.",
    steps: [
      {
        title: "Create an artifact",
        instruction: "Ask the agent to write a design specification for a new component.",
        code: "Create an artifact detailing our database schema.",
        language: "text",
        output: "Creating artifact: database_schema.md (Saved to artifacts/)\n[Artifact Rendering in Auxiliary Pane]"
      },
      {
        title: "Inspect files modified",
        instruction: "Navigate to the Artifacts tab in the Desktop app to view the rendered schema markdown and copy definitions directly.",
        code: "# Web-based Markdown Preview loaded in UI",
        language: "html",
        output: "Successfully rendered database_schema.md"
      }
    ]
  },
  {
    id: "multi-agent-orchestration",
    title: "Multi-Agent Orchestration",
    surface: "App 2.0",
    level: "Advanced",
    description: "Design a hierarchy of specialized agents to co-author, audit, and deploy features in parallel.",
    steps: [
      {
        title: "Set up the team structure",
        instruction: "Run the teamwork-preview command to design an agent collaboration topology.",
        code: "/teamwork-preview build a compiler: Lead (orchestration) -> Syntax Parser (agent) -> Code Generator (agent)",
        language: "text",
        output: "Topological Map Generated:\n- Lead Agent (Spawns subagents, performs final validation)\n  |-- Subagent A: Syntax Parser (Reads files, parses syntax trees)\n  |-- Subagent B: Code Generator (Generates target files)"
      },
      {
        title: "Execute parallel task",
        instruction: "Run the task and observe the multi-threaded agent execution log.",
        code: "Execute compiler build goal.",
        language: "text",
        output: "[Lead] Spawning Subagent A and Subagent B...\n[Subagent A] Parsed 12 input files.\n[Subagent B] Generated output assets in dist/\n[Lead] Running test suite... Build verified successfully."
      }
    ]
  }
];
