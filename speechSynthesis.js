function readAloudTexts() {
    const lastText = getLastUserInput();
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'en-US';
    utterance.text = lastText;

    const selectedVoice = englishVoices[voiceSelection.value];
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
        if (listening) getVoiceInput();
    };

    speakResponse(utterance);
}

function getLastUserInput() {
    return log.textContent.split('You :').pop().split('\n')[0].trim();
}

function speakResponse(utterance) {
    log.innerHTML += `<p>Sim : ${utterance.text}</p>`;
    window.speechSynthesis.speak(utterance);
}
