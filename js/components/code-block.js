// Code Block component with copy functionality
import { showToast } from './toast.js';

export function renderCodeBlock(code, language = 'javascript') {
  // Simple custom client-side syntax highlighter for JS, Python, HTML, Shell, Yaml, JSON
  const highlighted = highlightCode(code, language);
  
  const lines = code.trim().split('\n');
  const lineNumbersHtml = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
  
  const block = document.createElement('div');
  block.className = 'code-container';
  block.innerHTML = `
    <div class="code-header">
      <span class="code-lang">${language}</span>
      <button class="btn-copy">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.4m1.5 2.25h3.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H6.9m3.75-12h5.025c.9 0 1.63.73 1.63 1.63v14.996c0 .9-.73 1.63-1.63 1.63H11.25m3.75-18.375a1.125 1.125 0 0 0-2.25 0v3.375c0 .621.504 1.125 1.125 1.125h3.375a1.125 1.125 0 0 0 2.25 0v-3.375a1.125 1.125 0 0 0-1.125-1.125H15Z" /></svg>
        <span>Copy</span>
      </button>
    </div>
    <div class="code-editor-body">
      <div class="line-numbers">${lineNumbersHtml}</div>
      <pre><code class="language-${language}">${highlighted}</code></pre>
    </div>
  `;
  
  // Attach copy event listener
  const copyBtn = block.querySelector('.btn-copy');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.querySelector('span').innerText = 'Copied!';
      copyBtn.style.borderColor = 'var(--accent-green)';
      copyBtn.style.color = 'var(--accent-green)';
      showToast('Copied to clipboard!', 'success');
      
      setTimeout(() => {
        copyBtn.querySelector('span').innerText = 'Copy';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2000);
    }).catch(err => {
      showToast('Failed to copy code.', 'warning');
    });
  });
  
  return block;
}

// Basic regex highlighter for key terms
function highlightCode(code, language) {
  // Escape HTML tags to prevent execution
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  if (language === 'javascript' || language === 'typescript') {
    return escaped
      // Keywords
      .replace(/\b(const|let|var|function|return|import|export|from|await|async|with|as|class|new|extends|try|catch|throw|if|else|for|while)\b/g, '<span style="color:#f43f5e">$1</span>')
      // Strings
      .replace(/(["'`])(.*?)\1/g, '<span style="color:#10b981">$&</span>')
      // Comments
      .replace(/(\/\/.*)/g, '<span style="color:#64748b; font-style:italic">$1</span>')
      // Functions
      .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span style="color:#38bdf8">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span style="color:#fb923c">$1</span>');
  }
  
  if (language === 'python') {
    return escaped
      // Keywords
      .replace(/\b(def|import|from|as|with|return|print|class|try|except|for|in|while|if|elif|else|and|or|not|is|None|True|False)\b/g, '<span style="color:#f43f5e">$1</span>')
      // Decorators
      .replace(/(@\w+)\b/g, '<span style="color:#c084fc">$1</span>')
      // Strings
      .replace(/(["'])(.*?)\1/g, '<span style="color:#10b981">$&</span>')
      // Comments
      .replace(/(#.*)/g, '<span style="color:#64748b; font-style:italic">$1</span>')
      // Functions
      .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span style="color:#38bdf8">$1</span>');
  }
  
  if (language === 'bash' || language === 'sh') {
    return escaped
      // Comments
      .replace(/(#.*)/g, '<span style="color:#64748b; font-style:italic">$1</span>')
      // Common commands
      .replace(/\b(agy|npm|npx|cd|mkdir|touch|git|firebase|pip|run|install|build|deploy)\b/g, '<span style="color:#38bdf8">$1</span>')
      // Parameters/Options
      .replace(/\s(-\w+|--\w+)/g, ' <span style="color:#fb923c">$1</span>')
      // Strings
      .replace(/(["'])(.*?)\1/g, '<span style="color:#10b981">$&</span>');
  }
  
  if (language === 'yaml' || language === 'yml') {
    return escaped
      // Keys
      .replace(/^(\s*[\w\-\s]+)(:)/gm, '$1<span style="color:#f43f5e">$2</span>')
      // Values (strings or numbers)
      .replace(/:\s+([^\n]+)/g, ': <span style="color:#10b981">$1</span>')
      // Frontmatter separators
      .replace(/(---)/g, '<span style="color:#a855f7">$1</span>');
  }
  
  if (language === 'json') {
    return escaped
      // Keys
      .replace(/(["'])(.*?)\1(\s*:)/g, '<span style="color:#f43f5e">"$2"</span>$3')
      // Values (strings)
      .replace(/:\s*(["'])(.*?)\1/g, ': <span style="color:#10b981">"$2"</span>')
      // Numbers & Booleans
      .replace(/:\s*(true|false|null|\d+)/g, ': <span style="color:#fb923c">$1</span>');
  }
  
  return escaped;
}
