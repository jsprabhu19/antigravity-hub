export const antigravityGuideData = [
  {
    id: "cli",
    title: "Antigravity CLI (agy)",
    tagline: "The command-line powerhouse for autonomous agentic execution",
    description: "An advanced, terminal-based user interface designed for high-throughput coding, workspace navigation, and background task management.",
    difficulty: "Intermediate",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
    sections: [
      {
        title: "TUI Layout & Navigation",
        content: "The `agy` interface divides your terminal into three major sections: the **Chat Panel** (left) for conversation history, the **Auxiliary Pane** (right) for background task logs and file diffs, and the **Prompt Bar** (bottom) for interactive command entry. You can switch focus between these panes using your arrow keys or custom shortcuts."
      },
      {
        title: "Configuration (`settings.json`)",
        content: "Configure default behaviors in `~/.antigravity/settings.json`. Keys include `theme` (default: 'nebula'), `maxConcurrency` (default: 4), `defaultModel` (default: 'gemini-3.5-flash'), and `safeMode` (default: true, which prompts for confirmation on file deletions)."
      }
    ],
    shortcuts: [
      { keys: "Ctrl + J / K", action: "Scroll Chat Panel up/down" },
      { keys: "Ctrl + L", action: "Clear active conversation view" },
      { keys: "Tab", action: "Toggle focus between Chat Panel, Auxiliary Pane, and Prompt Bar" },
      { keys: "Ctrl + T", action: "Open a new background terminal/session" },
      { keys: "Ctrl + W", action: "Close current terminal or active subagent session" },
      { keys: "Ctrl + Shift + F", action: "Toggle full-screen mode for the active pane" },
      { keys: "Ctrl + H", action: "Open shortcut help overlay (lists all 50+ keybindings)" },
      { keys: "Alt + P", action: "Pause/Resume active background execution" }
    ],
    slashCommands: [
      { command: "/goal", description: "Trigger deep execution mode. Agent will run continuously in the background, spawning subagents and verifying results until the goal is fully achieved." },
      { command: "/schedule", description: "Schedule a task to run periodically or after a delay. Ideal for running tests or audits overnight." },
      { command: "/browser", description: "Launch the headless or headed browser subagent to perform web actions, testing, or documentation scraping." },
      { command: "/learn", description: "Record an interaction sequence or solution as a persistent skill for future workspace tasks." },
      { command: "/grill-me", description: "Enter an interactive interview mode where the agent asks clarifying questions to refine a design plan." },
      { command: "/teamwork-preview", description: "Visualize the proposed agent-to-agent collaboration topology before starting a complex task." }
    ],
    examples: [
      {
        title: "Initializing a project and running a goal",
        language: "bash",
        code: `# Navigate to your project folder
cd my-new-project

# Launch the Antigravity CLI and set a persistent goal
agy "/goal build a fully responsive dashboard using vanilla JS and audit its accessibility"`
      },
      {
        title: "Scheduling a recurring build audit",
        language: "bash",
        code: `# Run test suite and check code quality every day at midnight
agy "/schedule '0 0 * * *' run npm run test && npm run lint --prompt 'Audit workspace and log errors'`
      }
    ]
  },
  {
    id: "app",
    title: "Antigravity 2.0 Desktop App",
    tagline: "Premium visual workspace for multi-agent workflows",
    description: "A rich, electron-based desktop experience featuring interactive canvas rendering, visual file-changed diffs, and real-time subagent monitoring.",
    difficulty: "Beginner",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>`,
    sections: [
      {
        title: "Workspace Layout",
        content: "The desktop application is optimized for visual clarity. The left sidebar shows **History**, **Artifacts**, **Files Changed**, and **Active Terminals**. The central section contains the **Chat Canvas** where markdown, code previews, and status messages render. The right **Auxiliary Panel** houses tabs for Subagents, Background Tasks, and live HTML/Preview rendering."
      },
      {
        title: "Multi-Agent Workflows",
        content: "Spawn subagents for specialized tasks (e.g., frontend styling, database tuning) directly from the UI. Watch them collaborate in real-time on a node-based flow graph showing data exchange and task delegation."
      }
    ],
    examples: [
      {
        title: "Spawning subagents from prompt",
        language: "javascript",
        code: `// The desktop app handles multi-agent orchestration behind the scenes:
const frontendAgent = await Antigravity.spawnSubagent({
  name: "Frontend Specialist",
  task: "Design a dark-themed login UI matching index.css design tokens",
  tools: ["write_file", "browser_automation"]
});

await frontendAgent.run();`
      }
    ]
  },
  {
    id: "ide",
    title: "Antigravity IDE",
    tagline: "VS Code integration with inline code lenses and smart completions",
    description: "An AI-first development environment integrated directly into VS Code, offering codebase-wide awareness and context-rich code completions.",
    difficulty: "Beginner",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>`,
    sections: [
      {
        title: "Inline Code Lenses",
        content: "Directly in your code editor, Antigravity inserts interactive lenses above functions. Click **Refactor**, **Generate Tests**, or **Explain** to trigger the AI agent. Code suggestions are displayed as inline diffs that you can accept (\`Tab\`) or reject (\`Esc\`)."
      },
      {
        title: "Workspace Context Awareness",
        content: "The IDE builds an offline semantic index of your imports, exports, and comments. When you ask a question, the agent references actual files in your workspace, ensuring zero hallucinated imports."
      }
    ],
    examples: [
      {
        title: "Inline Refactoring Request",
        language: "typescript",
        code: `// Write a comment directly in your file:
// @antigravity: Optimize this function using memoization and add type safety
function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}`
      }
    ]
  },
  {
    id: "sdk",
    title: "Antigravity Python SDK",
    tagline: "Programmatic agent leasing and custom tool orchestration",
    description: "A pythonic framework for orchestrating Gemini 3.5 models, defining custom tools, and building autonomous agent fleets.",
    difficulty: "Advanced",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.755-.54-1.337-1.177-1.337H9.937c-.637 0-1.177.582-1.177 1.337v.186c0 .755.54 1.337 1.177 1.337h3.136c.638 0 1.177-.582 1.177-1.337v-.186ZM14.25 14.25c0-.755-.54-1.337-1.177-1.337H9.937c-.637 0-1.177.582-1.177 1.337v.186c0 .755.54 1.337 1.177 1.337h3.136c.638 0 1.177-.582 1.177-1.337v-.186Zm0 4.087c0-.755-.54-1.337-1.177-1.337H9.937c-.637 0-1.177.582-1.177 1.337v.186c0 .755.54 1.337 1.177 1.337h3.136c.638 0 1.177-.582 1.177-1.337v-.186ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
    sections: [
      {
        title: "Agent Lease Management",
        content: "Borrow agents with specific cognitive parameters using the lease API. You specify the model (e.g., \`gemini-3.5-flash\`), temperature, and system instructions, and release them once the execution completes."
      },
      {
        title: "Exposing Custom Tools",
        content: "Decorate any Python function with \`@tool\` to expose it directly to your leased agent. The SDK parses the docstrings and type hints to auto-generate the JSON tool declaration schema."
      }
    ],
    examples: [
      {
        title: "Orchestrating a Leased Agent with Custom Tools",
        language: "python",
        code: `from antigravity import AgentLease, tool

@tool
def fetch_system_metrics() -> dict:
    """Retrieves CPU and Memory usage of the local node."""
    return {"cpu_percent": 42.5, "memory_percent": 68.1}

# Lease an agent and attach the tool
with AgentLease(model="gemini-3.5-flash") as agent:
    agent.register_tool(fetch_system_metrics)
    response = agent.chat("Analyze my system metrics and suggest optimizations.")
    print(response.content)`
      }
    ]
  },
  {
    id: "skills",
    title: "Skills & Plugins",
    tagline: "Extensible capability registry with 40+ pre-built science plugins",
    description: "The core extensibility system allowing agents to inherit specialized capabilities and tools for fields like Bioinformatics, Chemistry, and Infrastructure.",
    difficulty: "Advanced",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>`,
    sections: [
      {
        title: "Skill Folder Structure",
        content: "A skill is a self-contained folder under \`skills/<skill_name>/\` containing a \`SKILL.md\` file (instruction set with name and description in YAML frontmatter), along with optional folders: \`scripts/\` (python/bash executables), \`examples/\` (reference code), and \`resources/\` (offline datasets/templates)."
      },
      {
        title: "Science Plugins Showcase",
        content: "Antigravity includes built-in integrations for major scientific databases, including: **AlphaFold DB** (structure confidence metrics), **dbSNP** (variant resolving), **PubMed** (clinical literature searching), **PubChem** (compound property queries), **UniProt** (protein metadata), and **PyMOL** (molecular visualization)."
      }
    ],
    examples: [
      {
        title: "YAML Frontmatter for Custom Skill (SKILL.md)",
        language: "yaml",
        code: `---
name: kubernetes-debugger
description: Diagnoses failing pods, retrieves logs, and proposes YAML fixes
---

# Instructions
1. Run \`kubectl get pods\` to identify issues.
2. If status is CrashLoopBackOff, execute \`kubectl logs <pod-name>\`...`
      }
    ]
  },
  {
    id: "advanced",
    title: "Customizations & Advanced",
    tagline: "Model Context Protocol (MCP) integrations, security guidelines, and rules",
    description: "Unlock the full potential of your agents by configuring global rules, attaching hooks, and connecting third-party databases via MCP.",
    difficulty: "Advanced",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.827m11.379-8.16 1.15-.827M8.14 21.27l.707-1.03m7.74-11.28.707-1.03M12 3v1.5m0 15V21m-4.5-1.5H3m16.5 0H21" /></svg>`,
    sections: [
      {
        title: "Rules (`AGENTS.md`)",
        content: "Establish behavior guardrails using markdown files. Write global constraints in \`~/.gemini/config/AGENTS.md\` and repository-specific guidelines in \`.agents/AGENTS.md\` in your project root. The agent parses these rules at runtime and updates its system instructions accordingly."
      },
      {
        title: "Model Context Protocol (MCP)",
        content: "Integrate custom data sources and toolkits by launching MCP servers. You can hook up local Jupyter kernels, SQLite databases, or external APIs. The agent discovers active servers from the configuration and automatically registers their tools."
      },
      {
        title: "Permissions & Safety",
        content: "Security is built-in. Actions like modifying files outside the workspace, calling external URLs, or running destructive shell commands (e.g. \`rm -rf /\`) require explicit verification and prompt approval in the UI."
      }
    ],
    examples: [
      {
        title: "Configuring a local SQLite MCP Server",
        language: "json",
        code: `// ~/.antigravity/mcp_config.json
{
  "mcpServers": {
    "sqlite-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db", "./data/prod.db"]
    }
  }
}`
      }
    ]
  }
];
