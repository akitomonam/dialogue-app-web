# 対話システム(WEB):開発中
対話システム用のwebアプリです。  
WebSocketを用いてサーバーと通信を行います。
## WEBサーバー構築
```
docker build -t dialogue-web-app .
docker run --rm -d -v /home/ec2-user/dialogue-app-web:/usr/share/nginx/html/ --name dialogue_web_app -p 80:80 -p 12345:12345 dialogue-web-app #一応socket通信用のポートも開放
docker ps
```
## 使い方
websocketのインストール
```
pip install websockets
```
サーバープログラム起動
```
python3 websocketServer.py
```
index.htmlをブラウザで開く
## 参考
- [吹き出し](https://www.nowonbun.com/247.html)  
- [吹き出しスクロール](https://zenn.dev/cho_kin/articles/scroll-to-bottom)  
- [WebSocket](https://codepen.io/kinformation/pen/vewVrP)  
- [音声認識](https://qiita.com/hmmrjn/items/4b77a86030ed0071f548)  
- [音声合成](https://qiita.com/hmmrjn/items/be29c62ba4e4a02d305c)
## 参考になるかも
- [WebSocket](https://www.raspberrypirulo.net/entry/websocket-server)
<!-- TODO:クライアントのコードを追加する -->
