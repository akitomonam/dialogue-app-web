// TODO: クラス化
// TODO:

// ウェブサーバを接続する。
URL = "ws://localhost:10504"
// URL = "ws://172.21.65.74:10504"
// URL = "ws://172.30.24.52:9001"
var webSocket = new WebSocket(URL);
// ウェブサーバから受信したデータを出力するオブジェクトを取得する。
var messageTextArea = document.getElementById("messageTextArea");

// ソケット接続すれば呼び出す関数。
webSocket.onopen = function (message) {
    messageTextArea.value += "Server connect...\n";
};

// ソケット接続が切ると呼び出す関数。
webSocket.onclose = function (message) {
    messageTextArea.value += "Server Disconnect...\n";
};

// ソケット通信中でエラーが発生すれば呼び出す関数。
webSocket.onerror = function (message) {
    messageTextArea.value += "error...\n";
};

// ソケットサーバからメッセージが受信すれば呼び出す関数。
webSocket.onmessage = function (message) {
    // 出力areaにメッセージを表示する。
    messageTextArea.value += "Recieve From Server => " + message.data + "\n";
    // 吹き出し追加
    addFukidashi(message.data, 0)
    // 発言を作成
    const uttr = new SpeechSynthesisUtterance(message.data)
    // 発言を再生 (発言キューに発言を追加)
    speechSynthesis.speak(uttr)
};

// サーバにメッセージを送信する関数。
function sendMessage() {
    //var message = document.getElementById("textMessage");
    // message.value = finalTranscript //音声認識結果を代入
    if (finalTranscript == "") {
        messageTextArea.value += "メッセージを入力してください\n";
        return;
    }
    // fukidashi_msg = finalTranscript
    messageTextArea.value += "Send to Server => " + finalTranscript + "\n";
    addFukidashi(finalTranscript, 1)
    // WebSocketでtextMessageのオブジェクトの値を送信する。
    webSocket.send(finalTranscript);
    //textMessageオブジェクトの初期化
    //message.value = "";
    finalTranscript = "";
    resultDiv.innerHTML = finalTranscript
}

// 通信を切断する。
function disconnect() {
    webSocket.close();
}

const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const clearRecBtn = document.querySelector('#clear-rec-btn');
const resetSystemHisBtn = document.querySelector('#reset-system-his-btn');
const resultDiv = document.querySelector('#result');
// const resultDiv = document.querySelector('#messageTextArea');

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = ''; // 確定した(黒の)認識結果
// var fukidashi_msg = ""; //吹き出しのメッセージ
recognition.onresult = (event) => {
    let interimTranscript = ''; // 暫定(灰色)の認識結果
    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript = transcript;
        }
    }
    resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
}

startBtn.onclick = () => {
    recognition.start();
}
stopBtn.onclick = () => {
    recognition.stop();
}

clearRecBtn.onclick = () => {
    finalTranscript = "";
    resultDiv.innerHTML = finalTranscript
}

resetSystemHisBtn.onclick = () => {
    messageTextArea.value += "システムの対話履歴をリセットします\n";
    webSocket.send("リセット");
    //textMessageオブジェクトの初期化
    //message.value = "";
}

function checkMsg() {
    const msg = document.getElementById("result");
    const button = document.getElementById("send-button");
    console.log(msg)
    if (msg.value && msg.value.length) {
        // 入力欄が空👉disabled
        button.disabled = false;
    } else {
        // 入力されている👉disabledを解除
        button.disabled = true;
    }
}

// window.onload = function () {
var container = document.getElementById('container');
var button = document.getElementById("send-button");


// チャットを追加する
var addChat = (msg, flag) => {
    // var text = input.value;
    var text = msg;
    var div = document.createElement("div");
    // div.innerText = text;
    // div.classList.add('child');
    div.classList.add('speech-bubble');

    var div2 = document.createElement("div");
    if (flag == 0) {
        div2.classList.add('sb-bubble', 'sb-line3', 'sb-left');
    } else {
        div2.classList.add('sb-bubble', 'sb-line3', 'sb-right');
    }
    div.appendChild(div2);

    var p = document.createElement("p");
    p.innerText = text;
    div2.appendChild(p)
    container.appendChild(div);
    // input.value = '';
};

// 下までスクロールする
var scrollToBottom = () => {
    container.scrollTop = container.scrollHeight;
};

// 一番下までスクロールしているかどうか
var isScrollBottom = () => {
    return container.scrollHeight === container.scrollTop + container.offsetHeight;
};

// button.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // 一番下までスクロールされていれば追加後も一番下までスクロールする
//     if (isScrollBottom()) {
//         addChat();
//         scrollToBottom();
//     }
//     // 一番下までスクロールされていなければスクロールしない
//     else {
//         addChat();
//     }
// });
// };

function addFukidashi(msg, flag = 0) {
    // e.preventDefault();
    // e.stopPropagation();
    // 一番下までスクロールされていれば追加後も一番下までスクロールする
    if (isScrollBottom()) {
        addChat();
        scrollToBottom();
    }
    // 一番下までスクロールされていなければスクロールしない
    else {
        addChat(msg, flag);
    }
}
