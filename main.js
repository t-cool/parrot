// チャット画面
const log = document.getElementById('log');

// 開始ボタン
const startButton = document.getElementById('start');

// 停止ボタン
const stopButton = document.getElementById('stop');

// 音声選択
const voiceSelection = document.getElementById('voiceSelection');

// 音声認識中かの判定フラグ
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