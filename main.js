const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const log = document.getElementById('log');
const voiceSelection = document.getElementById('voiceSelection');
let recognition;
let listening = false;

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

populateVoiceList();
