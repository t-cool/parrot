let englishVoices = [];

window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceList();
};

function populateVoiceList() {
    englishVoices = window.speechSynthesis.getVoices().filter(voice => voice.lang === 'en-US');
    voiceSelection.innerHTML = englishVoices.map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`).join('');
}

window.populateVoiceList = populateVoiceList;

