export const ideasData = [
  {
    id: "agy-task-reminder",
    title: "agy Task Reminder",
    level: "Beginner",
    category: "CLI",
    description: "A terminal utility that watches your active workspace and triggers system alerts when a TODO comment is written in a file.",
    challenge: "Use Node's file system watch APIs to scan file changes and parse code lines matching '// TODO: <task>'.",
    roadmap: [
      { text: "Initialize project using npm and create index.js", status: false },
      { text: "Install file watcher 'chokidar' and notification library 'node-notifier'", status: false },
      { text: "Write file scanner logic that reads modified files line-by-line", status: false },
      { text: "Filter lines for '// TODO:' and extract the task message", status: false },
      { text: "Trigger system notifications and print color-coded terminal alerts", status: false }
    ],
    starterCode: `import chokidar from 'chokidar';
import notifier from 'node-notifier';
import fs from 'fs';

console.log('Watching workspace for TODO comments...');

// Watch current directory for changes
chokidar.watch('./src').on('change', (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  const lines = content.split('\\n');
  
  lines.forEach((line, num) => {
    if (line.includes('// TODO:')) {
      const task = line.split('// TODO:')[1].trim();
      notifier.notify({
        title: 'New Workspace Task',
        message: \`Line \${num + 1}: \${task}\`
      });
      console.log(\`\x1b[33m[TODO Found]\x1b[0m \${path}:\${num + 1} - \${task}\`);
    }
  });
});`,
    language: "javascript",
    output: "Watching workspace for TODO comments...\n[TODO Found] ./src/utils.js:42 - optimize sorting algorithm"
  },
  {
    id: "gemini-translator",
    title: "Gemini Nano Selection Translator",
    level: "Beginner",
    category: "Web",
    description: "A web widget that detects highlighted text on a webpage and translates it instantly using local browser AI models.",
    challenge: "Access on-device translation APIs and manage fallbacks if local model models are still loading.",
    roadmap: [
      { text: "Create index.html layout with a floating tooltip panel", status: false },
      { text: "Add mouseup listener to capture user text selections", status: false },
      { text: "Check browser support for 'window.translation' or window.ai", status: false },
      { text: "Query the local translation model to translate selection to Spanish/Japanese", status: false },
      { text: "Render translated outputs inside the tooltip with fade-in animation", status: false }
    ],
    starterCode: `// Capture highlight text selections
document.addEventListener('mouseup', async () => {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 2) {
    showTooltip('Translating...', event.pageX, event.pageY);
    
    try {
      // Connect to local on-device translation model
      const translator = await window.translation.createTranslator({
        sourceLanguage: 'en',
        targetLanguage: 'es'
      });
      const result = await translator.translate(selection);
      updateTooltip(result);
    } catch (err) {
      updateTooltip('Error: On-device translation not available.');
    }
  }
});`,
    language: "javascript",
    output: "[Selection] 'Hello world' -> [Translated] 'Hola mundo'"
  },
  {
    id: "alphafold-visualizer",
    title: "AlphaFold Structure Dashboard",
    level: "Intermediate",
    category: "Science",
    description: "A web interface that queries the AlphaFold API for protein UniProt IDs, displays pLDDT structural confidence scores, and plots amino acid boundaries.",
    challenge: "Request structure coordinates, parse massive JSON coordinate lists, and represent confidence categories graphically.",
    roadmap: [
      { text: "Build an input form requesting UniProt Accession IDs", status: false },
      { text: "Fetch structural confidence metrics from AlphaFold API endpoints", status: false },
      { text: "Group scores into Very High (>90), Confident (70-90), Low (50-70), and Very Low (<50)", status: false },
      { text: "Draw dynamic bar charts visualizing domain boundaries", status: false }
    ],
    starterCode: `async function fetchProteinStructure(uniprotId) {
  const url = \`https://alphafold.ebi.ac.uk/api/prediction/\${uniprotId}\`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data && data.length > 0) {
    const plddtScores = data[0].uniprotAllAtomPLDDT;
    console.log(\`Loaded \${plddtScores.length} amino acids for \${uniprotId}\`);
    
    // Categorize scores
    const categories = plddtScores.reduce((acc, score) => {
      if (score >= 90) acc.veryHigh++;
      else if (score >= 70) acc.confident++;
      else acc.low++;
      return acc;
    }, { veryHigh: 0, confident: 0, low: 0 });
    
    renderDashboard(categories);
  }
}`,
    language: "javascript",
    output: "Loaded 146 amino acids for P68871\nVery High Confidence residues: 112\nConfident residues: 24\nLow Confidence residues: 10"
  },
  {
    id: "sdk-issue-tagger",
    title: "SDK Issue Auto-Tagger",
    level: "Intermediate",
    category: "SDK",
    description: "A Python server that listens for repository issue webhooks, leases a Gemini model, and automatically labels the issue.",
    challenge: "Handle asynchronous webhook triggers, orchestrate SDK model leases, and format output tags cleanly.",
    roadmap: [
      { text: "Write a Python Flask app to listen for Github webhook POST requests", status: false },
      { text: "Verify GitHub webhook signatures for security authentication", status: false },
      { text: "Extract the issue title and body from the payload", status: false },
      { text: "Lease an agent via antigravity-sdk to classify the text", status: false },
      { text: "Trigger GitHub API calls to assign the predicted labels", status: false }
    ],
    starterCode: `from flask import Flask, request, jsonify
import antigravity as ag
import requests

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    payload = request.json
    issue_data = payload.get('issue', {})
    title = issue_data.get('title')
    body = issue_data.get('body')
    
    # Lease an AI agent to classify the issue
    with ag.AgentLease(model="gemini-3.5-flash") as agent:
        prompt = f"Classify this issue into [bug, feature, documentation]. Title: {title}. Body: {body}"
        tag = agent.chat(prompt).text.strip().lower()
        
    # Assign label on GitHub
    assign_label(issue_data.get('number'), tag)
    return jsonify({"status": "success", "assigned_label": tag})`,
    language: "python",
    output: "Received webhook for Issue #104: 'Cannot parse settings.json'\nAgent assigned label: bug"
  },
  {
    id: "aurasync-composer",
    title: "AuraSync Ambient Composer",
    level: "Expert",
    category: "Web",
    description: "An interactive, sensory ambient sound composer that reads camera light variations and synthesizes spatial audio tracks using Web Audio APIs.",
    challenge: "Process real-time video frames, map lighting indices to synthesizers, and keep track-changes mathematically harmonious.",
    roadmap: [
      { text: "Access camera stream securely via browser getUserMedia", status: false },
      { text: "Set up Web Audio API AudioContext with oscillator and filter nodes", status: false },
      { text: "Extract average pixel intensity (light values) from canvas frames", status: false },
      { text: "Map light indices to synth frequencies and filter cutoff points", status: false },
      { text: "Render glowing visual canvas shapes representing compose state", status: false }
    ],
    starterCode: `// Set up audio synthesizer
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const osc = audioCtx.createOscillator();
const filter = audioCtx.createBiquadFilter();

osc.connect(filter);
filter.connect(audioCtx.destination);
osc.start();

// Read camera frame averages
function processCameraFrames(video, canvas) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
  let brightness = 0;
  for (let i = 0; i < imgData.length; i += 4) {
    brightness += (imgData[i] + imgData[i+1] + imgData[i+2]) / 3;
  }
  brightness /= (imgData.length / 4);
  
  // Map brightness index (0-255) to sound frequency
  const targetFreq = 100 + (brightness * 2);
  osc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1);
  filter.frequency.setTargetAtTime(targetFreq * 1.5, audioCtx.currentTime, 0.1);
}`,
    language: "javascript",
    output: "Camera stream active.\nAmbient Light: 142 lux -> Synth frequency set to: 384Hz"
  },
  {
    id: "echothread-editor",
    title: "EchoThread Canvas Editor",
    level: "Expert",
    category: "Web",
    description: "A zoomable node-canvas editor where users co-author story branches, and multiple character agents generate narrative expansions in parallel.",
    challenge: "Calculate canvas coordinate matrix transforms for zoom/pan operations and coordinate multi-agent threads asynchronously.",
    roadmap: [
      { text: "Construct HTML5 canvas element with panning mouse listeners", status: false },
      { text: "Store narrative nodes inside a custom JSON Tree Graph", status: false },
      { text: "Write draw loops that translate and scale the canvas matrix", status: false },
      { text: "Integrate chat dialogs that trigger character subagent narrative scripts", status: false },
      { text: "Add smooth node insertion and layout repositioning animations", status: false }
    ],
    starterCode: `class StoryCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.nodes = [];
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    
    // Apply panning and zoom transform
    this.ctx.translate(this.panX, this.panY);
    this.ctx.scale(this.zoom, this.zoom);
    
    this.nodes.forEach(node => {
      this.ctx.fillStyle = '#111128';
      this.ctx.fillRect(node.x, node.y, 150, 60);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText(node.title, node.x + 10, node.y + 35);
    });
    
    this.ctx.restore();
  }
}`,
    language: "javascript",
    output: "Story Canvas initialized. Story Tree contains 6 plot branches."
  }
];
