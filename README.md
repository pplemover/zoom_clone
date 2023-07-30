# Zoom Clone using NodeJS, WebRTC and Websockets
### from NomadCoders Zoom Clone Coding

## **목차**

- [기술들](#**기술들**)
- [1. Server Setup](#**1._Server_Setup**)
- [2. Frontend Setup](#**2._Frontend_Setup**)
- [3. WEBSOCKETS로 실시간 채팅 어플 만들기](#**3._WEBSOCKETS로_실시간_채팅_어플_만들기**)


### **기술들**
#### (1) Express

  `Express`는 Node.js를 위한 웹 애플리케이션 프레임워크이다. Express는 미들웨어(요청(request)과 응답(response) 사이에서 동작하는 함수)들을 중심으로 동작하며, 작하는데, 이 함수들을 조합하여 애플리케이션의 동작을 조정할 수 있다. Express는 다양한 HTTP 요청 메서드(GET, POST, PUT, DELETE 등)를 처리할 수 있으며, 요청 데이터의 처리, 파라미터 추출, 응답 생성 등을 간편하게 수행할 수 있다. 또한 URL에 대한 요청을 적절한 핸들러 함수로 전달하여 처리하는 라우팅 기능을 제공한다. 그리고 Express는 Pug, EJS, Handlebars 등 다양한 뷰 엔진과의 통합을 지원하여 템플릿 기반의 HTML을 생성하여 동적인 HTML 페이지를 생성할 수 있다.

#### (2) Pug

  `Pug`는 HTML 마크업을 생성하기 위한 템플릿 엔진 중 하나로, 동적인 HTML을 개발하는 경우에 유용하다. HTML을 작성할 때, 태그 이름과 속성을 약식으로 작성할 수 있기 때문이다. Pug는 Node.js를 기반으로 동작하며, Node.js 애플리케이션에서 서버 측 템플릿 엔진으로 사용된다. Pug 파일을 작성하고 이를 컴파일하여 HTML로 변환하면, 클라이언트에게 전송할 준비가 된 최종 HTML 문서를 얻을 수 있다.

#### (3) Nodemon

  `Nodemon`은 Node.js 개발 환경에서 자동으로 애플리케이션을 감시하고 변경 사항이 있을 때 자동으로 재시작해주는 도구이다. 개발 중인 Node.js 애플리케이션을 실행할 때, 파일의 변경을 감지하여 자동으로 서버를 다시 시작함으로써 생산성이 향상된다. 단, 프로젝트 디렉토리에서 애플리케이션을 실행하기 위한 명령어로 node 대신 nodemon을 사용(`nodemon app.js`)해야 한다.

#### (4) Babel

  Babel은 최신 JavaScript 문법을 구 버전의 JavaScript로 변환해주는 도구이다. 최신 브라우저는 새로운 JavaScript 문법을 지원하지만, 오래된 브라우저는 이를 이해하지 못하는 경우가 있다. Babel은 이러한 상황에서 최신 문법으로 작성된 코드를 구 버전의 JavaScript로 변환하여 모든 브라우저에서 동작할 수 있도록 보장한다. 

  <hr>


  ### **1. Server Setup**

  zoom 프로젝트 폴더에서 `npm init -y`로 Node.js 프로젝트를 위한 package.json 파일을 생성한다. package.json은 프로젝트 설정 정보와 의존성 패키지들을 정의하는 역할을 한다. `-y` 옵션은 프로젝트의 모든 설정에 기본값으로 자동으로 동의하여 package.json을 생성한다.

  `npm i nodemon -D` 명령어로 Node.js 프로젝트에서 nodemon 패키지를 설치한다. 설치 후 package.json 파일의 'devDependencides' 목록에 해당 패키지가 추가되었음을 확인할 수 있다.

  #### 현재 프로젝트 구조

  ```bash
  ├── .gitignore
  ├── nodemon.json
  ├── babel.config.json
  ├── src
  │   ├── server.js
  └── README.md
  ``` 

  `nodemon.json`는 nodemon 설정을, `babel.config.json` 파일은 Babel 설정을 포함하는 파일이다. `src/server.js` 파일은 서버 애플리케이션의 진입점 역할을 하는 파일로, 여기에서 서버를 설정하고 실행할 수 있다.

  #### Babel 설치

  다음으로 Babel을 설치한다. `npm i @babel/core @babel/cli @babel/node @babel/preset-env -D`명령어로 Babel 관련 패키지들을 설치한다. 
    
  - @babel/core: Babel의 핵심 패키지로, Javascript 코드 변환을 처리한다.
  - @babel/cli: Babel CLI 도구로, 터미널에서 Babel을 실행할 수 있게 한다.
  - @babel/node: Babel을 사용해서 Node.js 애플리케이션을 실행할 수 있는 도구이다. Babel이 코드 변환을 수행하면 node.js가 변환된 코드를 실행한다. 
  - @babel/preset-env: Babel에서 환경에 맞는 트랜스파일 설정을 자동으로 해주는 프리셋(preset)

  nodemon.js에서 다음 코드의 `exec` 옵션은 nodemon이 감시하는 파일이 변경될 때 실행할 명령을 지정하는 옵션이다.
  > {
  >  "exec": "babel-node src/server.js"
  > }
  즉, nodemon은 `src/server.js` 파일을 감시해서 파일이 변경될 때마다 Babel을 통해 해당 파일을 변환한 후 실행하도록 지정한다. 이를 통해 코드가 변경될 때마다 개발 서버를 자동으로 재시작할 수 있다. 

  또한, babel.config.json에서 다음 코드는 Babel이 제공하는 프리셋으로 최신 JavaScript 문법을 대상 환경에 맞게 자동으로 변환해주는 역할을 한다. 
  > {
  > "presets": ["@babel/preset-env"]
  > }

  package.json에는 다음 코드는 `dev`라는 사용자 정의 스크립트를 정의하고, 해당 스크립트가 'nodemon' 명령어를 실행하도록 설정한 것이다. 
  > "scripts": {"dev": "nodemon"},
  터미널에서 `npm run dev' 명령어를 실행하면 'nodemon' 명령이 실행되고, nodemon은 서버 파일을 실시간 감시하여 자동으로 서버를 재시작한다.

  마지막으로 `npm i express`로 express를, `npm i pug`로 pug를 설치한다.

  #### 웹 서버 동작 확인 
  src/server.js의 다음 코드는 express 프레임워크를 사용하여 웹 서버가 잘 작동하는지 간단하게 확인한다.
  ```javascript
  // server.js
  import express from "express"; // Es6의 모듈 시스템을 사용하여 'express' 모듈을 불러오기
  const app = express(); // 새로운 express 어플리케이션 객체 'app'을 생성
  console.log('hello!');
  app.listen(3000); // 'app' 객체의 listen 메서드를 호출하여 웹 서버를 시작 (3000번 포트에서 실행) 
  ```
  콘솔창에`npm run dev` 명령어를 실행하여 웹 서버가 잘 구동되는지 확인한다. (콘솔창에 hello! 확인)

  ### **2. Frontend Setup**

  다음으로, Express 애플리케이션의 뷰를 렌더링할 수 있도록 세팅한다. 

  #### 프로젝트 구조
  ```bash
  ├── .gitignore
  ├── nodemon.json
  ├── babel.config.json
  ├── src
  │   ├── server.js
  │   ├── views
  │         ├── home.pug
  │   ├── public
  │         ├── js
  │             ├── app.js    
  └── README.md
  ``` 

  #### Express 애플리케이션 설정
  src/server.js 의 아래 코드는 app 객체의 set 메서드를 사용하여 Express 애플리케이션에서 Pug 뷰 엔진을 설정하고, 뷰 파일의 경로를 지정한다. 
  ```JavaScript
  // server.js
  app.set("view engine", "pug");
  app.set("views", __dirname + "/views");
  ```
  `__dirname`은 현재 실행 중인 스크립트의 디렉토리 경로를 나타내는 Node.js의 내장 변수이다. 즉, 현재 스크립트가 위치한 디렉토리를 기준으로 "/views" 디렉토리를 지정한다. 위처럼 설정한 뷰 엔진과 뷰 파일 경로는 나중에 라우팅과 함께 사용되어 클라이언트에게 동적인 HTML 페이지를 제공하는 데 활용될 것이다.

  아래 코드는 '/public' 엔드포인트로 GET 요청이 들어왔을 때 해당 요청에 대해 'public' 디렉토리의 정적 파일을 제공하는 역할을 한다. 
  ```JavaScript
  app.use("/public", express.static(__dirname + "/public"));
  ```

  마찬가지로, 아래 코드는 루트 경로("/")에 대한 GET 요청이 들어올 때 'home'이라는 Pug 템플릿을 렌더링하여 클라이언트에게 제공하는 역할을 한다.
  ```JavaScript
  app.get("/", (req, res) => res.render("home"));
  ```
  #### Catch-all URL 설정하기
  또, server.js에서 Catch-all URL을 설정해야 한다. Catch-all URL이란 경로에 상관없이 모든 요청을 핸들러 함수나 라우트로 보내는 역할을 한다. 예를 들어, 사용자가 존재하지 않는 경로에 접근했을 때 404 페이지를 보여줄 수 있다.
  ```JavaScript
  app.get("*", (req, res) => res.redirect("/"));
  ```

  위 코드는 Catch-all URL을 사용하여 모든 경로에 대한 GET 요청을 `/` 경로로 redirect하여 페이지를 다시 로드하도록 한다. 예를 들어, '/about', '/contact', '/products' 와 같이 현 시점에서 존재하지 않는 경로로 접근했을 때 모두 `/` 경로로 redirect 시켜준다. 

  #### 개발 서버 최적화: Nodemon 설정

  다음으로, `nodemon.js`에 다음 코드를 추가한다. 
  > "ignore": ["src/public/*"],

  일반적으로 'src/public' 디렉토리에는 클라이언트에게 제공하기 위한 정적 파일이 포함된다. 이러한 파일은 개발 중에 빈번하게 수정된다. (가령 app.js는 FrontEnd에서 구동된다) 그래서 파일 변경 감지 및 자동 재시작 기능을 수행하는 nodemon에게 "src/public" 디렉토리 내부의 변경 사항을 무시하도록 명시함으로써, 불필요한 재시작을 방지하고 개발 서버의 성능을 향상시킬 수 있다.

  #### MVP CSS 적용: Modular-View-Controller for CSS

  마지막으로, MVP CSS(Modular-View-Controller for CSS)를 적용할 것이다. MVP CSS는 CSS 코드를 관리하기 쉽고 재사용 가능한 모듈 단위로 분리하여 프론트엔드 개발에서 코드의 구조화와 유지 보수성을 향상시키는 데 도움이 되는 방법론이다. 다음 코드를 header에 추가하면 된다.
  > `link(rel="stylesheet", href="https://unpkg.com/mvp.css")`
  
  물론 추후에 CSS 작업을 별도로 진행할 예정이지만, 초기 단계에서 아무런 꾸밈 없이 개발하는 것보다는 낫다. 


  ### **3. WEBSOCKETS로 실시간 채팅 어플 만들기**

  이 프로젝트에서 구현할 실시간 채팅 어플리케이션의 핵심 기능은 사용자들이 익명으로 메시지를 보내고 받을 수 있도록 하는 것이다. 이를 위해서는 사용자가 채팅방을 만들 수 있으며, 채팅에서 사용할 닉네임을 설정할 수 있어야 한다. 부수적으로는 채팅방에 입장 및 퇴장하면 알림(예: 'oo님이 입장했습니다')이 발생하도록 할 것이다. 또한 채팅방에 현재 참여 중인 사용자 수를 확인할 수도 있다.

  #### WebSocket 프로토콜 개념
  실시간 통신을 가능하게 해주는 것은 WebSocket 프로토콜 덕분이다. HTTP 프로토콜의 가장 큰 특징은 `stateless`하다는 것이다. 그래서 실시간으로 request, response가 일어나지 않고, 클라이언트가 서버에 요청을 보내야만 서버에서 응답을 전송할 수 있다. 반면 WebSocket 프로토콜은 `statefull` 하기 때문에 HTTP와 다르게 지속적인 연결을 제공하며, 클라이언트와 서버 간 여러 데이터를 양방향으로 전송할 수 있다. 서버가 언제든 클라이언트에게 데이터를 푸쉬(push) 할 수 있으므로 실시간 업데이트가 가능하다. 한 번 연결된 후에는 마치 Wi-Fi처럼 계속해서 실시간 연결이 유지된다. 또한 Websocket은 텍스트 기반인 HTTP 프로토콜과 다르게 이진(Binary) 형식으로 데이터를 주고받기 때문에 이미지, 오디오, 비디오 등과 같은 다양한 데이터 유형을 보다 효율적으로 전송할 수 있게 해준다. 

  웹 브라우저는 내장된 WebSocket API가 있는데, 이 API를 사용하면 서버와 WebSocket 연결을 열고, 메시지를 주고받으며, 연결 상태를 관리할 수 있다. 
  - `new WebSocket(url[, protocols])`: WebSocket 객체를 생성하고 서버와의 연결을 연다. 
  - `WebSocket.send(data)`: 서버로 메시지를 보낸다.
  - `WebSocket.close([code[, reason]])`: WebSocket 연결을 닫는다.

  참고로 브라우저(클라이언트)에서는 이미 WebSocket API가 내장되어 있으므로, 프론트엔드 단에서는 별도의 설치가 필요하지 않다.

  #### ws 패키지
  Node.js로 WebSocket 서버를 만들기 위해 `ws` 패키지를 사용할 수 있다. ws 패키지는 WebSocket 프로토콜의 핵심 기능만을 제공하므로 채팅방과 같은 고급 기능을 구현하기는 어렵다. 하지만 기본 기능을 테스트하고 WebSocket을 익히기 데에는 제격이다. 
  
  터미널에서 `npm i ws` 명령어로 ws를 설치한다. 아래 코드는 동일한 포트 번호를 사용하여 HTTP와 웹소켓 서버를 함께 실행하는 부분이다.
  ```JavaScript
  ...
  import WebSocket from 'ws';
  import http from 'http';
  ...
  const server = http.createServer(app); // HTTP 서버 생성 (app은 Express 앱 객체)
  const wss = new WebSocket.Server({server}); // 생성한 HTTP 서버를 이용하여 WebSocket 서버 생성.

  server.listen(3000, handleListen); // HTTP 서버를 3000번 포트에서 시작함. 
  ```
  간단히 말해, Express로 생성한 HTTP 서버를 웹소켓 서버로 '업그레이드'하여 실시간 양방향 통신을 지원할 수 있도록 하는 과정이다. 

  #### WebSocket Events
   백엔드 단에서는 다음과 같은 이벤트 핸들러를 사용하여 다양한 연결 상황을 처리할 수 있다: 
  - 1. `open`, `close` 이벤트: 웹소켓 연결의 열림이나 닫힘 상태를 확인할 때 사용한다. 
  - 2. `message` 이벤트: 서버가 클라이언트로부터 메시지를 수신했을 때 발생하는 이벤트이다. 서버는 전달받은 메시지 데이터를 분석하거나, 다른 클라이언트에게 메시지를 전달할 수 있다. 
  - 3. `error` 이벤트: 웹소켓 연결 중에 오류가 발생했을 때 발생한다. 연결 오류, 통신 오류, 프로토콜 오류 등 다양한 오류 상황을 감지하고 처리할 수 있다. 필요한 경우 오류를 기록하거나 클라이언트에게 오류 메시지를 전달할 수 있다.
  - 4. `connection` 이벤트: 백엔드에서 클라이언트와의 웹소켓 연결이 확립되었음을 알려주는 이벤트이다.

  예를 들어 클라이언트가 WebSocket 서버에 연결할 때 트리거되는 'connection' 이벤트를 활용해 보자. 다음 코드는 wss(WebSocket 서버) 객체에 'connection' 이벤트가 발생했을 때 실행될 'handleConnection' 함수를 등록하는 예시이다.
  ```JavaScript
  // server.js
  function handleConnection(socket){
    console.log(socket); // handleConnection 함수는 socket(WebSocket객체)를 콘솔창에 출력한다.
  }
  wss.on("connection", handleConnection); // on()메서드를 사용해 'connection' 이벤트 리스너를 등록함. connection 이벤트가 발생할 때, 즉 WebSocket과의 연결이 확립될 때 'handleConnection' 함수가 실행된다.
  ```
  클라이언트가 WebSocket 서버에 연결되면, connection 이벤트가 발생한다. handleConnection 함수는 클라이언트와 연결된 소켓 객체(socket)를 매개변수로 받는다. 백엔드의 console에서 이 socket(연결된 브라우저)을 볼 수 있다. 이때 위 코드를 아래와 같이 리팩터링할 수 있음을 알아두자.
  ```JavaScript
  wss.on("connection", (socket) => {
    console.log(socket);
  });
  ```

  #### 프런트엔드에서 웹소켓 연결 생성하기 
  프런트엔드에서 단에서 WebSocket 객체를 생성하기 위해서는 현재 웹 페이지의 호스트 주소를 동적으로 가져와야 한다. 프런트엔드(app.js)에서 다음 코드를 작성한다.
  ```JavaScript
  // app.js
  const socket = new WebSocket(`ws://${window.location.host}`)
  ```
  현재 접속한 클라이언트의 호스트 주소에 대한 WebSocket 연결을 시도한다. 예를 들어 웹페이지가 'example.com'에서 로드되었다면, 웹소켓은 'ws://example.com' 주소로 연결을 시도하게 된다. 이렇게 생성된 socket 객체를 활용하여 연결 상태 변화에 대한 다양한 이벤트를 처리할 수 있다. 서버로 데이터를 전송하거나 (`socket.send(data)`), 서버로부터 수신된 데이터를 처리하거나 (`onmessage` 이벤트 핸들러), WebSocket 연결을 종료할 수 있다(`socket.close()`).  
  

  #### 서버에서 클라이언트로 메시지 전송해 보기
  이제 본격적으로 WebSocket 서버와 클라이언트 간의 상호작용을 구현한다. 아래 코드는 연결 성공 시 서버가 `send()` 메서드를 사용하여 클라이언트에게 'hello!' 메시지를 전송하는 부분이다. 
  ```JavaScript
  // server.js
  wss.on("connection", (socket) => { // 웹소켓 연결 시 실행되는 콜백 함수
    console.log("Connected to Browser ✔"); 
    socket.on("close", () => console.log('Disconnected from Browser ⛔')); // 웹소켓 연결 종료 시 이벤트 핸들링
    socket.send("hello!"); // 클라이언트에게 데이터(메시지) 전송 
  });
  ```

  app.js에서 아래 코드는 연결 성공 시 프런트엔드 단에서 확인 메시지를 콘솔에 출력하는 부분이다. 
  ```JavaScript
  // app.js
  socket.addEventListener("open", () => {
    console.log("Connected to Server ✔")
  });
  ```
  같은 원리로 메시지를 받을 때마다, 혹은 연결이 끊어졌을 때 실행될 이벤트 리스너도 추가해준다.
  ```JavaScript
  // app.js
  socket.addEventListener("message", (message) => {
    console.log("You got this: ", message, "from the server");
  });
  socket.addEventListener("close", () => {
    console.log("Disconnected from Server ⛔");
  });
  ``` 

  성공적으로 연결된다면, 크롬 개발자도구의 콘솔창에 `Connected to Server ✔` 를 확인할 수 있다. 또한, 서버가 `send()` 메서드로 전송한 메시지를 볼 수 있다. 
  ![메시지확인](./zoom/images/readme_messagevent.png)

  `data: "hello!"`와 `timeStamp: 2149.2000000476837`를 확인할 수 있다. 이를 활용해 'message' 객체에 담긴 실제 데이터('hello!')를 가져와 출력할 수 있다.
  ```JavaScript
  // app.js
  socket.addEventListener("message", (message) => {
    console.log("You got this: ", message.data, "from the server at", message.timeStamp,);
  });
  ```
  실행결과는 아래와 같다.
  ![메시지확인](./zoom/images/readme_messagevent2.png)

  서버와의 연결이 종료된다면 'close' 이벤트 리스너가 실행된다.
  ![섭종료](./zoom/images/readme_terminate.png)
  
  #### 클라이언트에서 서버로 메시지 전송해 보기
  이번에는 프런트엔드 단에서 `send()` 메서드를 사용하여 서버에게 메시지를 전송해 본다. 
  ```JavaScript
  // app.js
  setTimeout(() => { // setTimeout 함수를 사용
    socket.send(JSON.stringify("hello from the browser" )); // send() 메서드로 문자열을 JSON 형식으로 변환하여 WebSocket으로 변환 
  }, 1000); // 1초(1000밀리초) 후에 실행

  // server.js
  wss.on("connection", (socket) => { // 클라이언트가 WebSocket으로 서버에 연결하면 
    socket.on("message", (data) => { // 수신된 데이터를 
      const message = JSON.parse(data); // 'JSON.parse(data)'를 통해 JSON 형식에서 JavaScript 객체로 변환
      console.log(message); // 변환된 메시지를 서버 콘솔에 출력.
    });
  });
  ```
  1초 후에 'hello from the browser' 라는 메시지가 콘솔에 출력된다. 클라이언트가 서버로 문자열을 보낼 때는 바이너리 형태로 전달된다. 따라서 JSON 형식을 사용하여 데이터를 인코딩하여 전송하고 디코딩해야 함을 주의해야 한다.

  이로써 front-end와 back-end가 양방향으로 연결되었음을 확인할 수 있다. 성공적인 연결 때는 서버(왼쪽), 클라이언트(오른쪽)에서 성공 메시지를 확인할 수 있다.  
  ![테스트완료](./zoom/images/readme_connecttest.png)

  #### 웹소켓 연결상태에서 메시지 주고받기 (from BE to FE)
  (1) FE에서 메시지 입력할 폼 만들어주기 - 폼(form)의 제출(submit) 이벤트가 발생했을 때 form에 적은 메시지를 개발자 도구의 콘솔창에 출력해보도록 한다. 
  ```JavaScript
  // app.js
  const messageForm = document.querySelector("form");

  function handleSubmit(event){
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const input = messageForm.querySelector("input"); // input 태그를 찾아서,
    console.log(input.value); // input 요소의 값(value)을 콘솔에 출력.
  };

  messageForm.addEventListener("submit", handleSubmit); // 폼이 제출될 때 handleSubmit 함수가 호출됨
  ```
  ![폼테스트완료](./zoom/images/readme_formtest.png)
  폼에 hello 라고 입력하면, 콘솔창에 hello를 확인할 수 있다. 코드가 정상 동작함을 확인하였으므로, 이제 실제 서버에 전송하기 위해 아래와 같이 코드를 수정한다. 

  (2) 폼에서 적은 메시지를 BE로 보내기 
  ```JavaScript
  // app.js
  function handleSubmit(event){
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const input = messageForm.querySelector("input"); 
    socket.send(JSON.stringify(input.value));  // WebSocket을 통해 'value' 값을 서버로 전송
    input.value = ""; // 사용자가 메시지를 전송한 후에 입력 필드를 비움
  };
  ```
  클라이언트 측에서 메시지를 서버로 전송할 때 객체를 string으로 변환해서 사용해야 한다는 점을 주의한다. 

  (3) BE에서 보낸 메시지를 FE로 보내기 
  ```JavaScript
  wss.on("connection", (socket) => {
    ...
    socket.on("message", (data) => {
      const message = JSON.parse(data); 
      // 클라이언트로부터 받은 데이터를 parse하여 message에 담는다.
      ...
      socket.send(message); 
      // 클라이언트로 메시지를 전송한다. 
    });
  });
  ```

  (4) BE가 보낸 메시지를 FE에서 처리하기
  아래는 app.js에서 프런트 단이 소켓이 메시지를 받으면 콘솔에 message.data를 출력하는 것에 대해 정의한 것이다.
  ```JavaScript
  // app.js
  socket.addEventListener("message", (message) => {
    console.log("You got this: ", message.data, "from the server at", message.timeStamp,);
  });
  ```
  따라서 크롬 브라우저의 콘솔창에 `You got this: ~` 형태의 메시지를 확인할 수 있다.

  #### 연결된 사용자(클라이언트) 정보를 서버에 저장하기
  현재로서는 하나의 브라우저 탭(클라이언트)은 서버와 개별적으로 연결을 맺고 있다. 즉, 서로 다른 클라이언트 간 통신은 불가능하다. 예를 들어 2개의 브라우저 탭을 localhost:3000에 동시에 연결했을 때, 한 탭에서 메시지를 전송하러다도 다른 탭에는 메시지가 전달되지 않는다. 하지만 실제 채팅방을 구현하기 위해서는 실시간으로 사용자 간에 메시지를 주고받을 수 있게 해야 한다. 
  
  선결되어야 하는 것은 어떤 사용자가 서버에 접속해 있는지 확인하는 것이다. 이를 위해 서버에 연결된 모든 소켓의 정보를 저장하기 위한 가상의 데이터베이스(`sockets`)를 서버 단(server.js)에 만들 것이다. 서버가 어떤 클라이언트 소켓으로부터 메시지를 받으면, `sockets`에 저장된 클라이언트들에게 메시지를 전송할 것이다.
  ```JavaScript
  // server.js
  const sockets = []; // sockets 배열은 서버에 연결된 모든 소켓을 담게 된다.
  ...
  wss.on("connection", (socket) => { 
    sockets.push(socket); // 소켓이 sockets 배열에 추가된다.
    ...
    socket.on("message", (data) => { // 수신된 data를,
      const message = JSON.parse(data); // JSON 형식으로 파싱하여 'message' 변수에 저장함.
      sockets.forEach((aSocket) => aSocket.send(message)); // 각 소켓(aSocket), 즉 연결된 클라이언트에게 message를 보낸다. 
    });
  });

  ```
  콜백 함수는 연결된 각 클라이언트 소켓에 대해 실행되므로, 연결된 모든 클라이언트 정보가 `sockets`에 저장된다. 이제 하나의 클라이언트가 전송한 메시지를 서버와 연결된 모든 클라이언트에게 보낼 수 있다.

  클라이언트는 서버로부터 메시지를 받으면 (message 이벤트) 새로운 li 태그를 ul 태그의 자식 요소로 생성할 것이다.
  ```JavaScript
  // app.js
  socket.addEventListener("message", (message) => {
    const li = document.createElement("li"); // 새로운 리스트 아이템 요소를 생성하여 li 변수에 할당 
    li.innerText = message.data; // 메시지의 데이터를 li 요소의 내용으로 설정
    messageList.append(li); // messageList(ul 요소)에 li 요소를 append
  });
  ``` 
  이제 아래 이미지와 같이 메시지를 화면에서 확인할 수 있다.
  ![테스트완료](./zoom/images/readme_messageonscreen.png)


  #### NickNames
  사용자에게 nickname(별명)을 직접 입력 받고, 일반적인 메시지와 닉네임을 함께 표시하려 한다. 이를 위해 닉네임을 입력 받는 폼을 만들고, 해당 폼이 제출되면 닉네임을 서버로 전송할 것이다. 단, 'type' 속성에 'nickname'을 추가하여 서버에서 일반적인 메시지와 닉네임을 구분할 수 있도록 할 것이다. 
  ```JavaScript
  // app.js
  function makeMessage(type, payload){
    const msg = {type, payload}; // JSON 객체 msg 생성
    return JSON.stringify(msg); // msg를 문자열로 변환
  };
  ```
  makeMessage 함수는 'type(메시지 유형)'과 'payload(메시지 내용)' 값을 사용하여 JSON 형식의 메시지를 만들고 문자열로 변환하여 반환하는 역할을 수행한다.

  ```JavaScript
  function handleNickSubmit(event){
    ...
    socket.send(makeMessage("nickname", input.value));
    ...
  };
  ``` 
  즉, 위와 같이 사용자가 메시지를 폼에 입력하고 제출하는 과정에서 makeMessage 함수를 사용하여 메시지 유형과 메시지 내용을 JSON 형태로 생성하여 서버로 전송할 수 있다. 

  이제 서버 단에서는 2개의 메시지 유형(new_message, nickname)에 대해 각각 어떻게 처리해야 하는지를 정의하여야 한다. 클라이언트가 서버에 보낸 메시지를 파싱하고, 그것이 'new_message'인 경우에는 모든 클라이언트에게 전송하고, 'nickname'인 경우에는 socket에 저장한다.
  ```JavaScript
  wss.on("connection", (socket) => {
    ...
    socket.on("message", (message) => {
      const parsed = JSON.parse(message); // JSON 형식으로 파싱
      if (parsed.type === "new_message"){ // 파싱된 메시지의 타입이 new_message일 경우,
        sockets.forEach((aSocket) => aSocket.send(parsed.payload)); 
        // 연결된 모든 소켓(클라이언트)에게 메시지를 보낸다. 
      } else if (parsed.type === "nickname"){ // 파싱된 메시지의 타입이 nickname인 경우
        socket["nickname"] = parsed.payload;
        // parsed.payload에 담긴 값을 현재 클라이언트 소켓의 'nickname' 속성으로 설정한다. 
      }
    });
  });
  ```

  동일한 코드를 아래와 같이 리팩토링할 수 있다. (메시지의 타입을 처리할 때 if else 문 대신 switch 문을 사용)
  ```JavaScript
  wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous"
    console.log("Connected to Browser ✔");
    socket.on("close", () => console.log('Disconnected from Browser ⛔'));
    socket.on("message", (msg) => {
      const parsed = JSON.parse(msg); // JSON 형식으로 파싱
      switch(parsed.type){
        case "new_message":
          sockets.forEach((aSocket) => 
            aSocket.send(`${socket.nickname}: ${parsed.payload}`)
          );
        case "nickname":
          socket["nickname"] = parsed.payload;
      }
    });
  });
  ```
  위 코드에서 `socket["nickname"] = "Anonymous"` 부분은 클라이언트의 닉네임의 기본 값으로 'Anonymous(익명)'을 설정한다. 즉, 클라이언트가 닉네임을 지정하지 않은 경우 기본 값으로 'Anonymous'가 쓰이게 된다.


  ### **4. SOCKETIO**
  지금까지 `웹 소켓(WSS)`으로 구현한 웹 브라우저와 서버 간에 양방향 통신은 아직 완벽한 채팅 앱으로서는 부족하다. 가령 여러 명이 참가한 방에서 socket 하나가 연결이 끊어지면 이를 어떻게 처리해야 할까? 연결된 모든 소켓들을 실시간으로 확인하고 업데이트하는 기능이 필요하다. 이러한 기능들을 구현하기 위해 지금보다 더 복잡한 로직과 코드가 필요한데, 다행히도 websocket의 복잡함을 덜어주는 프레임워크가 있는데, 그것이 바로 `SocketIO`이다.

  `SocketIO`란 실시간(real-time), 양방향(bidirectional)으로, 이벤트에 기반(event-based)하여 프런트엔드와 백엔드 간 소통을 가능하게 해주는 프레임워크이다. 어떤 플랫폼, 브라우저, 디바이스에 상관없이 사용 가능하다. Socket.IO는 기본적으로 웹 소켓을 지원하는데, 만약 웹 소켓 사용이 불가능한 경우에도 폴링(Polling), 롱 폴링(Long Polling) 등 다양한 전송 방식을 지원하여 최적의 통신 방법을 알아서 선택한다는 점이 가장 큰 장점이자 특징이다. 이는 Socket.IO로 채팅, 실시간 게임, 알림 시스템 등 다양한 실시간 애플리케이션을 쉽게 구축할 수 있는 이유이다.

  #### socketIO 서버 만들기
  먼저 `npm`을 사용하여 Socket.IO를 설치한다.
  > `npm i socket.io` 
  
  ```JavaScript
  // server.js
  import SocketIO from "socket.io";
  ...
  const server = http.createServer(app);
  const io = SocketIO(server);
  ...
  server.listen(3000, handleListen);
  // HTTP 서버를 3000번 포트에서 시작함. 
  ```
  이전에 WebSocket 서버를 만든 방법을 상기해보면, HTTP 서버를 생성한 후 새로운 WebSocket을 HTTP 위에 쌓아 올렸다. 클라이언트는 HTTP를 통해 서버와 처음에 연결하고, 그 후에 WebSocket 연결을 통해 실시간 통신을 할 수 있게 된다. Socket.IO도 이와 유사하다. 

  `const server = http.createServer(app);` 는 Express 애플리케이션 app을 기반으로 HTTP 서버 객체를 생성하여 server 변수에 저장하는 부분이다.

  `const io = SocketIO(server);` 는 Socket.IO 모듈을 사용하여 이전에 생성한 HTTP 서버 server를 기반으로 Socket.IO 서버를 생성한다. 즉, 동시에 HTTP 서버와 WebSocket 서버를 생성하여 이 두 서버가 같은 포트를 공유하도록 설정한다. 

  socket.io를 서버 단에 설치했다면, 클라이언트 측 브라우저에서도 socket.io를 설치해야 한다. socket.io 라이브러리를 제공하는 CDN 서버에서 파일을 직접 불러오기 위해 아래와 같이 HTML 파일에 스크립트를 추가한다.
  
  ```HTML
  <!--home.pug-->
  script(src="/socket.io/socket.io.js")
  ```

  #### BE to FE
  일반적으로 서버 측에서는 여러 클라이언트와의 소켓 연결을 관리해야 한다. 아래 코드는 새로운 클라이언트가 서버에 접속하면 `connection` 이벤트 핸들러를 실행하여, 해당 클라이언트와 연결된 소켓 객체를 'socket' 매개변수를 통해 전달하는 코드이다.
  ```JavaScript
  // server.js
  io.on("connection", socket => { // 클라이언트가 서버에 접속하면 connection 이벤트 발생 
    console.log(socket); 
  });
  ``` 
  참고로 `socket`은 클라이언트와 연결된 소켓 객체를 의미하며, 각 클라이언트마다 하나의 소켓이 생성된다.

  #### FE to BE
  아래 코드는 프런트엔드(app.js)에서 socket을 백엔드와 연결해준다. 
  ```JavaScript
  // app.js
  const socket = io();
  ```
  `io` 함수는 자동으로 백엔드에서 실행하고 있는 socket.io 서버를 찾아서 연결을 도와주는 함수이다. Websocket에서 임의로 가상의 데이터베이스를 생성하고 소켓 정보를 넣어주었던 것과 다르게, socket.io 방식은 자동으로 현재 연결된 소켓 정보를 저장한다. 아래와 같이 `npm run dev` 실행 후 브라우저에서 localhost:3000에 접속하면, node.js와 연결된 소켓 정보가 출력된다.
  ![소켓정보](./zoom/images/readme_socketioconsole.png)

  #### 방(room) 만들기
  SocketIO를 이용하면 방(room)에 참가하고 떠나는 것이 간단해진다. 클라이언트 측에서 socket.io의 `emit()` 메서드를 통해 소켓에 원하는 이벤트(custom event)를 전달할 수 있다.
  ```JavaScript
  // app.js
  const welcome = document.getElementById("welcome")
  const form = welcome.querySelector('form');

  function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit("enter_room", { payload:input.value }); // object를 전송할 수 있다.
    input.value = "";
  };
  ```
  임의로 정한 'enter_room'이라는 이름의 이벤트를 소켓에 `emit`(전달)한다. 다음 인자로 원하는 값을 함께 전달할 수 있다. websocket을 사용할 때와 다르게, 데이터를 object에서 string 타입으로 변환해서 전달하지 않아도 된다.
  
  서버에서는 클라이언트에서 전달 받은 이벤트인 'enter_room'에 대해 두 번째 인자를 통해 전달 받은 값(payload:input.value)을 msg 변수에 저장하고, 콘솔에 출력한다.
  ```JavaScript
  // server.js
  const httpServer = http.createServer(app);
  const io = SocketIO(httpServer);

  io.on("connection", (socket) => {
    socket.on("enter_room", (msg) => console.log(msg));
  });
  ```
  ```JavaScript
  // server.js
  io.on("connection", (socket) => {
    socket.on("enter_room", (roomName) => {
      console.log(socket.id);    // 현재 소켓의 id 출력
      console.log(socket.rooms); // 현재 소켓이 포함된 채팅방 목록 출력
      socket.join(roomName);     // 현재 소켓을 roomName이라는 채팅방에 참가(채팅방 입장)
      console.log(socket.rooms)
      console.log(roomName) 
    });
  });
  ```
  socket.id, socket.rooms, socket.join()을 사용하여 socket.io로 채팅방을 만들었다. 

  #### 채팅방에 참가한 사용자(클라이언트)들에게 새로운 사용자가 참가했음을 알리기

  `socket.to(roomName)`은 roomName이라는 이름의 채팅방에 있는 소켓 중 본인을 제외한 나저미 소켓에 메시지를 보내는 함수이다. 

  ```HTML
  <!--home.pug-->
  ```

  ```JavaScript
  // server.js
  ```

  ```JavaScript
  // app.js
  ```
  ### **5. VIDEO CALL**

    이 
