// Create the right-click context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchMedTerm",
    title: "Search in MedTerm Lookup",
    contexts: ["selection"] // Show only when text is selected
  });
});

// When the user clicks the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchMedTerm" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText.trim());
    const url = `https://www.merriam-webster.com/medical/${query}`;
    chrome.tabs.create({ url });
  }
});