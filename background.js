// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if ('selectedText' in message) {
    const term = message.selectedText.trim();

    if (!term) {
      // Clear stored definition when selection is empty
      chrome.storage.local.set({ latestDefinition: null });
      return;
    }

    const apiKey = '0d88fadb-c6ff-4984-bef1-058d1fb4964c'; // Your Merriam-Webster API key
    const url = `https://www.dictionaryapi.com/api/v3/references/medical/json/${encodeURIComponent(term)}?key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        chrome.storage.local.set({ latestDefinition: { term, data } });
      })
      .catch(error => {
        console.error('Error fetching definition:', error);
        chrome.storage.local.set({ latestDefinition: { term, data: null } });
      });
  }
});
