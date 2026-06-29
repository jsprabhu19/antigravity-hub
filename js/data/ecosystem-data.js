export const ecosystemData = [
  {
    id: "gemini-flash",
    name: "Gemini 3.5 Flash",
    category: "Models",
    description: "High-speed reasoning model optimized for agentic coding and lightweight workflows.",
    details: "Combines ultra-low latency with highly competent reasoning, ideal for subagent execution and inline IDE code generation.",
    connections: ["gemini-omni", "gemini-spark", "vertex-ai", "ai-studio"]
  },
  {
    id: "gemini-omni",
    name: "Gemini Omni",
    category: "Models",
    description: "Google's premier multimodal model supporting text, audio, image, and video native processing.",
    details: "Processes video inputs and audio clips natively, enabling rich multimodal agents capable of GUI interactions.",
    connections: ["gemini-flash", "vertex-ai"]
  },
  {
    id: "gemini-spark",
    name: "Gemini Spark",
    category: "Agents",
    description: "An autonomous personal assistant agent operating on-device and in the cloud.",
    details: "Helps users with scheduling, research synthesis, and device coordination via secure personal context integration.",
    connections: ["gemini-flash"]
  },
  {
    id: "vertex-ai",
    name: "Vertex AI",
    category: "Platforms",
    description: "Enterprise-grade managed machine learning platform on Google Cloud.",
    details: "Offers robust model monitoring, agent evaluation suites, and seamless connection to BigQuery and Spanner.",
    connections: ["gemini-flash", "gemini-omni", "ai-studio"]
  },
  {
    id: "ai-studio",
    name: "Google AI Studio",
    category: "Tools",
    description: "Web-based prototyping environment for developer API key management and prompt engineering.",
    details: "Fast track to API access. Ideal for testing system prompts, temperature tuning, and exporting code directly to curl or python.",
    connections: ["gemini-flash", "vertex-ai"]
  },
  {
    id: "firebase-ai",
    name: "Firebase AI",
    category: "Tools",
    description: "Seamless SDK for building AI-powered mobile and web applications with Firebase backends.",
    details: "Provides on-device models via Gemini Nano and cloud access via Firebase Cloud Functions with built-in security rules.",
    connections: ["gemini-flash"]
  },
  {
    id: "notebook-lm",
    name: "NotebookLM",
    category: "Platforms",
    description: "AI-powered research assistant and note-taking app that auto-generates podcasts/audio overviews.",
    details: "Upload PDFs, Google Docs, and web links to instantly generate study guides, summaries, or realistic dialogue discussions.",
    connections: ["gemini-flash"]
  },
  {
    id: "codemender",
    name: "CodeMender",
    category: "Tools",
    description: "Autonomously analyzes codebases for vulnerabilities and applies pull-request-ready fixes.",
    details: "Scans repository structures for common security threats, out-of-date dependencies, and prints clean diff remediation code.",
    connections: ["gemini-flash"]
  },
  {
    id: "webmcp",
    name: "WebMCP",
    category: "Infrastructure",
    description: "Agent-ready infrastructure to expose browser UIs and system commands securely.",
    details: "Enables agents to interact with web sessions and run commands under user-defined sandboxing rules.",
    connections: ["gemini-flash"]
  },
  {
    id: "android-ai",
    name: "Android AI",
    category: "Infrastructure",
    description: "On-device intelligence layer powering Pixel devices and Android apps via Gemini Nano.",
    details: "Runs locally without network access, offering smart replies, text summaries, and offline image description capabilities.",
    connections: ["gemini-flash"]
  }
];
