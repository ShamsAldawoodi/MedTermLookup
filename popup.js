document.addEventListener('DOMContentLoaded', () => {
  const termEl = document.getElementById('term');
  const definitionEl = document.getElementById('definition');
  const messageEl = document.getElementById('message');
  const darkToggle = document.getElementById('darkToggle');

  // Load dark mode preference
  chrome.storage.sync.get('darkMode', (data) => {
    if (data.darkMode) {
      document.body.classList.add('dark');
      darkToggle.checked = true;
    }
  });

  // Get selected text from active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      termEl.textContent = 'None';
      messageEl.textContent = 'No active tab found.';
      definitionEl.textContent = '';
      return;
    }
    const tabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: () => window.getSelection().toString()
      },
      (results) => {
        if (chrome.runtime.lastError || !results || results.length === 0) {
          termEl.textContent = 'None';
          messageEl.textContent = 'Could not get selected text.';
          definitionEl.textContent = '';
          return;
        }
        const selectedText = results[0].result.trim();
        if (selectedText) {
          termEl.textContent = selectedText;
          messageEl.textContent = 'Loading definition...';
          fetchDefinition(selectedText);
        } else {
          termEl.textContent = 'None';
          messageEl.textContent = 'Highlight a medical term on the page first.';
          definitionEl.textContent = '';
        }
      }
    );
  });

  // Fetch Merriam-Webster Medical API definition
  function fetchDefinition(word) {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your API key
    const url = `https://www.dictionaryapi.com/api/v3/references/medical/json/${encodeURIComponent(word)}?key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          messageEl.textContent = 'No definition found.';
          definitionEl.textContent = '';
          return;
        }

        // If API returns suggestions (strings)
        if (typeof data[0] === 'string') {
          messageEl.textContent = 'No exact match found. Suggestions: ' + data.join(', ');
          definitionEl.textContent = '';
          return;
        }

        const shortdef = data[0].shortdef;
        if (shortdef && shortdef.length > 0) {
          messageEl.textContent = '';
          definitionEl.textContent = shortdef.join('; ');
        } else {
          messageEl.textContent = 'Definition not available.';
          definitionEl.textContent = '';
        }
      })
      .catch(error => {
        messageEl.textContent = 'Error fetching definition.';
        definitionEl.textContent = '';
        console.error('API fetch error:', error);
      });
  }

  // Dark mode toggle handler
  darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
      document.body.classList.add('dark');
      chrome.storage.sync.set({ darkMode: true });
    } else {
      document.body.classList.remove('dark');
      chrome.storage.sync.set({ darkMode: false });
    }
  });
});