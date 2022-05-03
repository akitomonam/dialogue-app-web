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
};
// サーバにメッセージを送信する関数。
function sendMessage() {
    var message = document.getElementById("textMessage");
    messageTextArea.value += "Send to Server => " + message.value + "\n";
    // WebSocketでtextMessageのオブジェクトの値を送信する。
    webSocket.send(message.value);
    //textMessageオブジェクトの初期化
    message.value = "";
}
// 通信を切断する。
function disconnect() {
    webSocket.close();
}
