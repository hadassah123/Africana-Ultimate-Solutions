/* Security Headers & Anti-Copy Protection */

// 1. Disable Right-Click Context Menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// 2. Disable Developer Tools Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // F12 (Developer Tools)
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I (Inspector)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+C (Inspector)
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+K (Console on Firefox)
  if (e.ctrlKey && e.shiftKey && e.key === 'K') {
    e.preventDefault();
    return false;
  }
});

// 3. Disable Text Selection & Copy
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.mozUserSelect = 'none';
document.body.style.msUserSelect = 'none';

// Prevent copy
document.addEventListener('copy', (e) => {
  e.preventDefault();
  return false;
});

// 4. Detect Developer Tools Open
setInterval(() => {
  const threshold = 160;
  if (window.outerHeight - window.innerHeight > threshold || 
      window.outerWidth - window.innerWidth > threshold) {
    console.clear();
    document.body.innerHTML = '<h1 style="text-align:center; margin-top: 50px; color: #d32f2f;">Developer Tools Disabled</h1><p style="text-align:center;">For security reasons, please close developer tools.</p>';
  }
}, 100);

// 5. Log warning to console (for those who get past the blocks)
console.log('%cStop!', 'font-size: 50px; color: red; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers.', 'font-size: 16px;');
console.log('%cIf someone told you to paste something here, DO NOT DO IT!', 'font-size: 14px; color: red; font-weight: bold;');
console.log('%cThis could give attackers access to your personal data.', 'font-size: 14px; color: red;');
