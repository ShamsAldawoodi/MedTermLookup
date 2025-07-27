# MedTermLookup
MedTerm Lookup
🌟 Project Overview
MedTerm Lookup is a Chrome extension designed to help medical students and professionals quickly find definitions and pronunciations of medical terms directly from any webpage. Simply highlight a medical term, and the extension fetches clear definitions and audio pronunciations using the Merriam-Webster Medical Dictionary API — no need to leave your reading material!

💡 Motivation
Understanding complex medical terminology quickly is essential for studying medicine efficiently. This extension bridges the gap between reading medical texts and instantly learning new vocabulary, making study sessions smoother and more effective.

🛠️ Tech Stack
Chrome Extension APIs (content scripts, messaging, storage)

JavaScript (ES6) for frontend and background scripts

Merriam-Webster Medical Dictionary API for definitions and audio pronunciations

HTML & CSS for UI components and styling

Local storage using Chrome's storage.local and storage.sync APIs

🚀 Features Implemented So Far
Highlight any medical term on a webpage and get instant definitions in the popup.

Audio pronunciation button with sound fetched from Merriam-Webster.

Dark mode toggle with saved user preference.

Auto-update popup content when the highlighted term changes.

Clean, responsive UI optimized for readability.

🧩 Challenges & Solutions
Async API calls: Handled race conditions between selection changes and API responses by always updating storage and popup from the latest term.

Audio playback: Integrated Merriam-Webster audio URLs with play/pause button and visual feedback.

Cross-script communication: Used Chrome messaging between content, background, and popup scripts to sync data.

State persistence: Leveraged chrome.storage.local to persist definitions and user preferences between popup opens.

Dark mode styling: Implemented CSS variables and toggle switch with saved preferences.

📸 Demo & Screenshots
(Add screenshots or a GIF here showing the extension in action)

🔮 What’s Next
Add word history and favorites list for review.

Support multi-language medical dictionaries.

Implement flashcard quiz mode for self-testing.

Improve UI with animations and better mobile responsiveness.

Integrate AI-powered explanations for complex terms.

🤝 Credits
Created by [Your Name]
Inspired by projects like VocabBuddy
API and audio data powered by Merriam-Webster Medical Dictionary
