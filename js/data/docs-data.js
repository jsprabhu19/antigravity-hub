export const docsData = {
  "welcome": {
    path: "/docs",
    title: "Welcome to Antigravity",
    category: "Welcome",
    description: "Introduction to Google's agentic workspace manipulation framework.",
    content: `
      <h2>Welcome to Antigravity</h2>
      <p>Google Antigravity is a state-of-the-art developer framework designed to streamline autonomous coding, tool orchestration, and cross-platform subagent spawning. By integrating with high-performance Gemini models, Antigravity enables your development workspace to operate with context-aware intelligence.</p>
      
      <div class="docs-callout tip">
        <strong>💡 Key Capability:</strong> Antigravity allows a parent agent to partition complex tasks and spawn specialized subagents to operate in parallel, securely isolated in sandboxed environments.
      </div>
      
      <h3>Deployment Surfaces</h3>
      <p>Antigravity runs across four interconnected environments (surfaces) to support different development workflows:</p>
      <ul>
        <li><strong>Antigravity TUI:</strong> Interactive terminal dashboard for running commands, listing active tasks, and rendering system status graphs.</li>
        <li><strong>Antigravity Desktop:</strong> Graphical window environment for visualizing file change-lists, orchestrating multi-agent trees, and launching browser subagents.</li>
        <li><strong>Antigravity IDE:</strong> Visual Studio Code extension providing inline code completion, context-aware chat, and direct file diff integrations.</li>
        <li><strong>Antigravity Python SDK:</strong> Programmatic library for initializing workspace sessions, creating custom skills, and querying LLMs directly from Python scripts.</li>
      </ul>
    `
  },
  "getting-started": {
    path: "/docs/getting-started",
    title: "Getting Started Guide",
    category: "Getting Started",
    description: "Learn how to write your first Antigravity script and boot the TUI.",
    content: `
      <h2>Getting Started with Antigravity</h2>
      <p>This guide walks you through setting up your workspace and initializing your first agent session.</p>
      
      <h3>Prerequisites</h3>
      <ul>
        <li>Node.js version 18.0 or higher</li>
        <li>Python version 3.10 or higher</li>
        <li>Valid Gemini API developer key</li>
      </ul>

      <h3>1. Workspace Setup</h3>
      <p>First, install the Antigravity Command Line Tool (<code>agy</code>) globally using npm:</p>
      <pre><code class="language-bash">npm install -g @google/antigravity</code></pre>

      <h3>2. Authenticating</h3>
      <p>Configure your API credentials by running the auth setup command. This binds your Google Cloud credentials or Gemini Developer Token to the local workspace:</p>
      <pre><code class="language-bash">agy auth login --token=YOUR_API_KEY</code></pre>

      <h3>3. Booting the TUI</h3>
      <p>Start the interactive Text User Interface (TUI) inside any project repository:</p>
      <pre><code class="language-bash">agy boot</code></pre>
      <p>This launches the full-terminal dashboard displaying your files, active subagent processes, and background logs.</p>
    `
  },
  "installation": {
    path: "/docs/installation",
    title: "Advanced Installation",
    category: "Getting Started",
    description: "Configuration variables and complex build options for Antigravity.",
    content: `
      <h2>Advanced Installation & Config</h2>
      <p>Antigravity can be customized using environment variables or a local <code>antigravity.json</code> workspace configuration file.</p>
      
      <h3>Configuration File Structure</h3>
      <p>Create a file named <code>antigravity.json</code> in the root of your project directory:</p>
      <pre><code class="language-json">{
  "workspace": {
    "name": "my-project",
    "sandbox": true,
    "maxSubagents": 5
  },
  "models": {
    "default": "gemini-3.5-flash",
    "fallback": "gemini-3.5-pro"
  },
  "logging": {
    "level": "debug",
    "path": "./logs/antigravity.log"
  }
}</code></pre>

      <h3>Supported Environment Variables</h3>
      <table class="docs-table">
        <thead>
          <tr>
            <th>Variable Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GEMINI_API_KEY</code></td>
            <td>String</td>
            <td>Your developer API token (Required if not logged in via CLI).</td>
          </tr>
          <tr>
            <td><code>AGY_SANDBOX_DISABLE</code></td>
            <td>Boolean</td>
            <td>Disables terminal sandboxing (Warning: runs code unsandboxed).</td>
          </tr>
          <tr>
            <td><code>AGY_LOG_LEVEL</code></td>
            <td>String</td>
            <td>Overrides default logging resolution (debug, info, error).</td>
          </tr>
        </tbody>
      </table>
    `
  },
  "api-js": {
    path: "/docs/api-js",
    title: "Javascript API Reference",
    category: "Developer Reference",
    description: "Node.js and browser API documentation for Antigravity JS client.",
    content: `
      <h2>Javascript API Reference</h2>
      <p>Use the JavaScript Client Library to control agent workspaces, trigger actions, and handle filesystem event loops inside Node.js applications.</p>

      <h3><code>AntigravityClient</code></h3>
      <p>Initialize a new client wrapper using your workspace credentials:</p>
      <pre><code class="language-javascript">import { AntigravityClient } from '@google/antigravity';

const client = new AntigravityClient({
  apiKey: process.env.GEMINI_API_KEY,
  workspaceDir: './src'
});</code></pre>

      <h3>Method: <code>client.spawnSubagent(options)</code></h3>
      <p>Asynchronously spawns a specialized helper subagent to perform code transformations.</p>
      <pre><code class="language-javascript">const subagent = await client.spawnSubagent({
  task: 'Analyze src/components/button.js and refactor to use functional components',
  permissions: ['read_file', 'write_file'],
  allowedPaths: ['./src/components/*']
});

subagent.on('progress', (data) => {
  console.log(\`[Subagent Progress]: \${data.percent}%\`);
});

const result = await subagent.wait();
console.log('Refactor complete:', result.status);</code></pre>
    `
  },
  "api-python": {
    path: "/docs/api-python",
    title: "Python SDK Reference",
    category: "Developer Reference",
    description: "Integrate Antigravity logic and custom tools within Python applications.",
    content: `
      <h2>Python SDK Reference</h2>
      <p>The Python SDK provides powerful programmatic access to task managers, tools configuration, and agent-driven workflows.</p>

      <h3>Installation</h3>
      <pre><code class="language-bash">pip install google-antigravity</code></pre>

      <h3>Initializing a Workspace Session</h3>
      <pre><code class="language-python">import antigravity as agy

# Connect to current project context
session = agy.connect_workspace(
    project_id="antigravity-hub",
    region="us-central1"
)

# List active subagent threads
active_tasks = session.list_tasks()
for task in active_tasks:
    print(f"Task ID: {task.id} | Status: {task.status}")</code></pre>

      <h3>Registering Custom Agent Skills</h3>
      <pre><code class="language-python">@session.register_skill(
    name="query_database",
    description="Allows subagents to query the clinical trials dataset."
)
def query_database(query: str):
    # Perform search logic
    return {"results": [{"id": 1, "title": "Trial A"}]}</code></pre>
    `
  },
  "cli-reference": {
    path: "/docs/cli-reference",
    title: "CLI Command Reference",
    category: "Developer Reference",
    description: "Complete list of parameters and arguments for the agy tool.",
    content: `
      <h2>CLI Command Reference</h2>
      <p>The <code>agy</code> command line utility allows fast access to tasks, configuration, credentials, and TUI launches.</p>

      <div class="docs-callout warning">
        <strong>⚠️ Note:</strong> Running CLI commands outside an initialized repository directory will result in a workspace-not-found error. Initialize files using <code>agy init</code>.
      </div>

      <h3>Commands Quick List</h3>
      <table class="docs-table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Parameters</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>agy init</code></td>
            <td>None</td>
            <td>Creates empty <code>antigravity.json</code> configuration.</td>
          </tr>
          <tr>
            <td><code>agy boot</code></td>
            <td><code>--port [num]</code></td>
            <td>Launches terminal TUI or opens the local web panel.</td>
          </tr>
          <tr>
            <td><code>agy task list</code></td>
            <td>None</td>
            <td>Lists all running background agents and their task IDs.</td>
          </tr>
          <tr>
            <td><code>agy task kill</code></td>
            <td><code>[task_id]</code></td>
            <td>Terminates a active subagent execution thread.</td>
          </tr>
        </tbody>
      </table>
    `
  }
};
