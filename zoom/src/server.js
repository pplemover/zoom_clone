import express from "express";
// Es6의 모듈 시스템을 사용하여 'express' 모듈을 불러오기

const app = express();
// express 함수를 호출하여 새로운 express 어플리케이션 객체 'app'을 생성

console.log('hello!');

app.listen(3000);
// 'app' 객체의 listen 메서드를 호출하여 웹 서버를 시작 (3000번 포트에서 실행) 