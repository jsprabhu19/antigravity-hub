// Premium custom dialog modal components
export function showConfirm(title, message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-modal-overlay';
  
  overlay.innerHTML = `
    <div class="confirm-modal-card">
      <div class="modal-header">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="modal-icon warning"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
        <h3>${title}</h3>
      </div>
      <div class="modal-body">
        <p>${message}</p>
      </div>
      <div class="modal-actions">
        <button class="modal-btn cancel" id="modal-btn-cancel">Cancel</button>
        <button class="modal-btn confirm" id="modal-btn-confirm">Confirm</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Trigger entry animation
  setTimeout(() => {
    overlay.classList.add('open');
  }, 10);
  
  function close() {
    overlay.classList.remove('open');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
  
  overlay.querySelector('#modal-btn-cancel').addEventListener('click', () => {
    close();
    if (onCancel) onCancel();
  });
  
  overlay.querySelector('#modal-btn-confirm').addEventListener('click', () => {
    close();
    if (onConfirm) onConfirm();
  });
  
  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      close();
      if (onCancel) onCancel();
    }
  });
}
