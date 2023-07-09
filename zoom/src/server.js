import express from "express";
// Es6의 모듈 시스템을 사용하여 'express' 모듈을 불러오기

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
 
const handleListen = () => console.log('Listening on http://localhost:3000');
app.listen(3000, handleListen);
// 'app' 객체의 listen 메서드를 호출하여 웹 서버를 시작 (3000번 포트에서 실행) 