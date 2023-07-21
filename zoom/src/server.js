import express from "express";
import SocketIO from "socket.io";
import http from 'http';

const app = express();
// express 함수를 호출하여 새로운 express 어플리케이션 객체 'app'을 생성

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// app 객체의 set 메서드를 사용하여 Express 애플리케이션에서 Pug 뷰 엔진을 설정하고, 
// 뷰 파일의 경로를 지정한다. 

app.use("/public", express.static(__dirname + "/public"));
// /public 경로로 들어오는 모든 요청에 대해 /public 경로 아래에 있는 정적 파일을 제공
app.get("/", (req, res) => res.render("home"));
// 루트 경로로 들어오는 GET 요청에 대해 'home' 탬플릿을 렌더링하여 응답함.
app.get("*", (req, res) => res.redirect("/"));
//  Catch-all URL을 사용하여 모든 경로에 대한 GET 요청을 "/" 경로로 redirect

const httpserver = http.createServer(app);
// HTTP 서버 생성 (app은 Express 앱 객체)
const io = SocketIO(httpserver);

io.on("connection", (socket) => {
  socket.on("enter_room", (msg) => console.log(msg));
});

// const server = http.createServer(app);
// HTTP 서버 생성 (app은 Express 앱 객체)
// const wss = new WebSocket.Server({server});
// // WebSocket.Server 클래스로 웹소켓 서버를 생성. 

// const sockets = [];
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous"
//   console.log("Connected to Browser ✔");
//   socket.on("close", () => console.log('Disconnected from Browser ⛔'));
//   // close 이벤트 핸들러(클라이언트와의 연결 종료될 때)
//   socket.on("message", (msg) => {
//     const parsed = JSON.parse(msg); // JSON 형식으로 파싱
//     switch(parsed.type){
//       case "new_message":
//         sockets.forEach((aSocket) => 
//           aSocket.send(`${socket.nickname}: ${parsed.payload}`)
//         );
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//     }
//   });
// });

const handleListen = () => console.log('Listening on http://localhost:3000');
// 서버가 시작될 때 'Listening on~' 메시지를 출력하는 handleListen 함수 정의 
server.listen(3000, handleListen);
// HTTP 서버를 3000번 포트에서 시작함.