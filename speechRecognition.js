function getVoiceInput() {
    var recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        processRecognitionResult(text);
        recognition.stop();
    };

    recognition.onend = () => {
        if (listening) readAloudTexts();
    };

    recognition.start();
}

function processRecognitionResult(text) {
    log.innerHTML += `<p>You : ${text}</p>`;
}

window.getVoiceInput = getVoiceInput;
window.processRecognitionResult = processRecognitionResult;
