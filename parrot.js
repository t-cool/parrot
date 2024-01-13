const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const log = document.getElementById('log');
const voiceSelection = document.getElementById('voiceSelection');
let recognition;
let listening = false;
let englishVoices = [];

window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceList();
};

function populateVoiceList() {
    englishVoices = window.speechSynthesis.getVoices().filter(voice => voice.lang === 'en-US');
    voiceSelection.innerHTML = englishVoices.map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`).join('');
}

startButton.addEventListener('click', () => {
    if (listening) return;
    listening = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    log.innerHTML += '<p>Listening...</p>';
    getVoiceInput();
});

stopButton.addEventListener('click', () => {
    if (!listening) return;
    recognition.stop();
    listening = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    log.innerHTML += '<p>Stopped listening.</p>';
});

function getVoiceInput() {
    recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        log.innerHTML += `<p>User said: ${text}</p>`;
        recognition.stop();
    };

    recognition.onend = () => {
        if (listening) readAloudTexts();
    };

    recognition.start();
}

function readAloudTexts() {
    const lastText = log.textContent.split('User said:').pop().split('\n')[0].trim();
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'en-US';
    utterance.text = lastText;

    const selectedVoice = englishVoices[voiceSelection.value];
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    log.innerHTML += `<p>System responded: ${utterance.text}</p>`;
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
        if (listening) getVoiceInput();
    };
}
