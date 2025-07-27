// content.js

function sendSelection() {
  const selection = window.getSelection().toString().trim();
  // Always send selection (even empty) to update stored definition accordingly
  chrome.runtime.sendMessage({ selectedText: selection });
}

document.addEventListener('mouseup', sendSelection);

document.addEventListener('keyup', (event) => {
  // Trigger on arrow keys or Ctrl/Command + A (select all) for selection changes
  if (
    event.key.startsWith('Arrow') ||
    (event.key.toLowerCase() === 'a' && (event.ctrlKey || event.metaKey))
  ) {
    sendSelection();
  }
});
