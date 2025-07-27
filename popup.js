document.addEventListener('DOMContentLoaded', () => {
  const termEl = document.getElementById('term');
  const definitionEl = document.getElementById('definition');
  const messageEl = document.getElementById('message');
  const darkToggle = document.getElementById('darkToggle');
  const playButton = document.getElementById('play-audio');
  const audioPlayer = document.getElementById('audio-player');

  // Load dark mode preference
  chrome.storage.sync.get('darkMode', (data) => {
    if (data.darkMode) {
      document.body.classList.add('dark');
      darkToggle.checked = true;
    }
  });

  // Load latest definition from storage
  chrome.storage.local.get('latestDefinition', (result) => {
    const latest = result.latestDefinition;

    if (latest && latest.term && latest.data) {
      showTermAndDefinition(latest.term, latest.data);
    } else {
      clearDisplay();
    }
  });

  // Display term, definition and setup audio if available
  function showTermAndDefinition(term, data) {
    termEl.textContent = term;
    messageEl.textContent = '';
    playButton.style.display = 'none';
    definitionEl.textContent = '';

    if (!Array.isArray(data) || data.length === 0) {
      messageEl.textContent = 'No definition found.';
      return;
    }

    if (typeof data[0] === 'string') {
      messageEl.textContent = 'No exact match found. Suggestions: ' + data.join(', ');
      return;
    }

    // Show definition(s)
    const shortdef = data[0].shortdef;
    if (shortdef && shortdef.length > 0) {
      definitionEl.textContent = shortdef.join('; ');
    } else {
      messageEl.textContent = 'Definition not available.';
    }

    // Setup pronunciation audio if available
    const prs = data[0].hwi?.prs;
    if (prs && prs.length > 0 && prs[0].sound?.audio) {
      const audioCode = prs[0].sound.audio;
      const firstLetter = audioCode.charAt(0);
      const audioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${firstLetter}/${audioCode}.mp3`;

      playButton.style.display = 'inline-flex';
      playButton.onclick = () => {
        audioPlayer.src = audioUrl;
        audioPlayer.play();
        playButton.classList.add('playing');
      };

      audioPlayer.onended = () => playButton.classList.remove('playing');
      audioPlayer.onpause = () => playButton.classList.remove('playing');
    } else {
      playButton.style.display = 'none';
      playButton.classList.remove('playing');
    }
  }

  // Clear display when no term/definition available
  function clearDisplay() {
    termEl.textContent = 'None';
    messageEl.textContent = 'Highlight a medical term on the page first.';
    definitionEl.textContent = '';
    playButton.style.display = 'none';
    playButton.classList.remove('playing');
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
