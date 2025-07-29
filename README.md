# MedTermLookup
MedTerm Lookup

Demo: 
***Still not ready yet!***

Project Overview:
MedTerm Lookup is a Chrome extension designed to help medical students and professionals quickly find definitions and pronunciations of medical terms directly from any webpage. Simply highlight a medical term, and the extension fetches clear definitions and audio pronunciations using the Merriam-Webster Medical Dictionary API. 
Note: This project is still under construction. Therefore, the current version uploaded here is only the main layout!

Motivation:
Understanding complex medical terminology quickly is essential for studying medicine efficiently; a branch of study I am personally acquainted with. This extension bridges the gap between reading medical texts and instantly learning new vocabulary, making study sessions smoother and more effective.

Features Implemented (so far):
- Highlight any medical term on a webpage and get instant definitions in the popup.
- Audio pronunciation button with sound fetched from Merriam-Webster.
- Dark mode toggle with saved user preference.
- Auto-update popup content when the highlighted term changes.
- Clean, responsive UI optimized for readability.

Challenges & Solutions (so far):
1) Async API calls: Handled race conditions between selection changes and API responses by always updating storage and popup from the latest term.

2) Audio playback: Integrated Merriam-Webster audio URLs with play/pause button and visual feedback.

3) Cross-script communication: Used Chrome messaging between content, background, and popup scripts to sync data.

4) State persistence: Leveraged chrome.storage.local to persist definitions and user preferences between popup opens.

5) Dark mode styling: Implemented CSS variables and toggle switch with saved preferences.

Tech Stack:
- Chrome Extension APIs (content scripts, messaging, storage)
- JavaScript (ES6) for frontend and background scripts
- Merriam-Webster Medical Dictionary API for definitions and audio pronunciations
- HTML & CSS for UI components and styling
- Local storage using Chrome's storage.local and storage.sync APIs

What’s Next:
- Add word history and favorites list for review.
- Support multi-language medical dictionaries.
- Implement flashcard quiz mode for self-testing.
- Improve UI with animations and better mobile responsiveness.
- Integrate AI-powered explanations for complex terms (TBD). 

Credits:
Created by Shams Al-dawoodi

API and audio data powered by Merriam-Webster Medical Dictionary
