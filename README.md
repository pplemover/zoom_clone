## Zoom Clone using NodeJS, WebRTC and Websockets
### **기술들**
#### (1) Express

  Express는 Node.js를 위한 웹 이플리케이션 프레임워크이다. Express는 미들웨어(요청(request)과 응답(response) 사이에서 동작하는 함수)를 중심으로 동작하는데, 필요한 미들웨어를 조합하여 애플리케이션의 동작을 조정할 수 있다. Express는 다양한 HTTP 요청 메서드(GET, POST, PUT, DELETE 등)를 처리할 수 있으며, 요청 데이터의 처리, 파라미터 추출, 응답 생성 등을 간편하게 수행할 수 있다. 또한 URL과 해당하는 핸들러 함수를 연결하여 요청을 처리하는 라우팅 기능을 제공한다. 즉, 특정 URL에 대한 요청을 적절한 핸들러 함수로 전달하여 처리할 수 있다. 그리고 Express는 Pug, EJS, Handlebars 등 다양한 뷰 엔진과의 통합을 지원하여 템플릿 기반의 HTML을 생성하여 동적인 HTML 페이지를 생성할 수 있다.

#### (2) Pug

  Pug는 HTML 마크업을 생성하기 위한 템플릿 엔진 중 하나로, 동적인 웹 페이지나 웹 애플리케이션을 개발하는 경우에 유용하다. 들여쓰기로 요소 계층 구조를 표현할 때, 태그 이름과 속성을 축약된 방식으로 작성할 수 있다. 이를 통해 HTML 작성을 단순화하고, 중첩된 요소와 속성을 보다 명확하게 표현할 수 있다. 또한, Pug는 변수, 조건문, 반복문 등과 같은 프로그래밍적인 요소를 사용하여 동적인 컨텐츠를 생성할 수 있다.

  Pug는 Node.js를 기반으로 동작하며, Node.js 애플리케이션에서 서버 측 템플릿 엔진으로 사용된다. Pug 파일을 작성하고 이를 컴파일하여 HTML로 변환하면, 클라이언트에게 전송할 준비가 된 최종 HTML 문서를 얻을 수 있다.

#### (3) Nodemon

  nodemon은 Node.js 개발 환경에서 자동으로 애플리케이션을 감시하고 변경 사항이 있을 때 자동으로 재시작하는 도구이다. 개발 중인 Node.js 애플리케이션을 실행할 때, 파일의 변경을 감지하여 자동으로 서버를 다시 시작함으로써 생산성이 향상된다. 단, 프로젝트 디렉토리에서 0애플리케이션을 실행할 때 명령어로 node 대신 nodemon을 사용(`nodemon app.js`)해야 한다.

#### (4) Babel

  Babel은 최신 JavaScript 문법을 구 버전의 JavaScript로 변환하여 브라우저 호환성을 확보하거나, Node.js 환경에서 최신 기능을 사용할 수 있도록 해준다.

  <hr>

  ### **Progress**

  #### 1. **Server Setup**

  zoom 프로젝트 폴더에서 `npm init -y`로 Node.js 프로젝트를 위해 새로운 package.json 파일을 생성한다. package.json은 프로젝트의 설정 정보와 의존성 패키지들을 정의하는 파일이며, `-y` 옵션은 프로젝트 설정을 위한 대화형 인터페이스를 스킵하고 모든 설정에 기본값으로 자동으로 동의하여 바로 package.json을 생성한다.

  `npm i nodemon -D` 명령어로 Node.js 프로젝트에서 nodemon 패키지를 설치한다. nodemon 패키지가 설치되고 `package.json` 파일의 'devDependencides' 목록에 해당 패키지가 추가된다. 

  현재 프로젝트 구조는 다음과 같다. 

  ```bash
  ├── .gitignore
  ├── nodemon.json
  ├── babel.config.json
  ├── src
  │   ├── server.js
  └── README.md
  ``` 

  `nodemon.json`는 nodemon 설정을, `babel.config.json` 파일은 Babel 설정을 포함하는 파일이다. `src/server.js` 파일은 서버 애플리케이션의 진입점 역할을 하는 파일로, 여기에서 서버를 설정하고 실행할 수 있다.

  다음으로 babel을 설치한다. `npm i @babel/core @babel/cli @babel/node @babel/preset-env -D`명령어로 npm을 사용하여 Babel 관련 패키지들을 설치한다. 
    
  - @babel/core: Babel의 핵심 패키지로, Javascript 코드 변환을 처리한다.
  - @babel/cli: Babel CLI 도구로, 터미널에서 Babel을 실행할 수 있게 한다.
  - @babel/node: Babel을 사용해서 Node.js 애플리케이션을 실행할 수 있는 도구. Babel이 코드 변환을 수행하고, 변환된 코드를 실행한다. 
  - @babel/preset-env: Babel에서 환경에 맞게 자동으로 필요한 트랜스파일 설정을 결정하는 프리셋(preset)

  nodemon.js에서 다음 코드의 'exec' 옵션은 nodemon이 감시하는 파일이 변경될 때 실행할 명령을 지정하는 옵션이다.
  > {
  >  "exec": "babel-node src/server.js"
  > }
  즉, nodemon은 `src/server.js` 파일을 감시해서 파일이 변경될 때마다 Babel을 통해 해당 파일을 변환한 후 실행하도록 지정한다. 이를 통해 코드가 변경될 때마다 개발 서버를 자동으로 재시작할 수 있다. 

  또한, babel.config.json에서 다음 코드는 Babel이 제공하는 프리셋으로 최신 JavaScript 문법을 대상 환경에 맞게 자동으로 변환해주는 역할을 한다. 
  > {
  > "presets": ["@babel/preset-env"]
  > }

  package.json에는 다음 코드는 'dev'라는 사용자 정의 스크립트를 정의하고, 해당 스크립트가 'nodemon' 명령어를 실행하도록 설정한 것이다. 
  > "scripts": {"dev": "nodemon"},
  터미널에서 `npm run dev' 명령어를 실행하면 'nodemon' 명령이 실행되고, nodemon은 서버 파일을 실시간 감시하여 자동으로 서버를 재시작한다.

  마지막으로 `npm i express`로 express를, `npm i pug`로 pug를 설치한다.

  src/server.js에서 다음 코드로 express 프레임워크를 사용하여 간단한 웹 서버를가 잘 작동하는지 확인한다.
  ```javascript
  import express from "express";
  // Es6의 모듈 시스템을 사용하여 'express' 모듈을 불러오기

  const app = express();
  // express 함수를 호출하여 새로운 express 어플리케이션 객체 'app'을 생성

  console.log('hello!');

  app.listen(3000);
  // 'app' 객체의 listen 메서드를 호출하여 웹 서버를 시작 (3000번 포트에서 실행) 
  ```
  콘솔창에`npm run dev` 명령어를 실행하여 웹 서버가 잘 구동되는지 확인한다. (콘솔창에 hello! 확인)

  #### 2. **Frontend Setup**

  다음으로, Express 애플리케이션의 뷰를 렌더링할 수 있도록 세팅한다. 이를 위한 프로젝트 구조는 다음과 같다. 

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

  src/server.js 의 아래 코드는 app 객체의 set 메서드를 사용하여 Express 애플리케이션에서 Pug 뷰 엔진을 설정하고, 뷰 파일의 경로를 지정한다. 
  ```JavaScript
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

  또, server.js에서 Catch-all URL 을 설정해야 한다. Catch-all URL이란 경로에 상관없이 모든 요청을 핸들러 함수나 라우트로 보내는 역할을 한다. 예를 들어, 사용자가 존재하지 않는 경로에 접근했을 때 404 페이지를 보여줄 수 있다.
  > app.get("*", (req, res) => res.redirect("/"));

  위 코드는 Catch-all URL을 사용하여 모든 경로에 대한 GET 요청을 `/` 경로로 redirect하여 페이지를 다시 로드하도록 한다. 예를 들어, '/about', '/contact', '/products' 와 같이 현 시점에서 존재하지 않는 경로로 접근했을 때 모두 `/` 경로로 redirect 시켜준다. 

  다음으로, `nodemon.js`에 다음 코드를 추가한다. 
  > "ignore": ["src/public/*"],

  일반적으로 'src/public' 디렉토리에는 클라이언트에게 제공하기 위한 정적 파일이 포함된다. 이러한 파일은 개발 중에 빈번하게 수정된다. (가령 app.js는 FrontEnd에서 구동된다) 그래서 파일 변경 감지 및 자동 재시작 기능을 수행하는 nodemon에게 "src/public" 디렉토리 내부의 변경 사항을 무시하도록 명시함으로써, 불필요한 재시작을 방지하고 개발 서버의 성능을 향상시킬 수 있다.

  마지막으로, MVP CSS (Modular-View-Controller for CSS)를 적용할 것이다. MVP CSS는 CSS 코드를 관리하기 쉽고 재사용 가능한 모듈 단위로 분리하여 프론트엔드 개발에서 코드의 구조화와 유지 보수성을 향상시키는 데 도움이 되는 방법론이다. 다음 코드를 header에 추가하면 끝이다.
  > `link(rel="stylesheet", href="https://unpkg.com/mvp.css")`
  
  물론 CSS 작업을 추후에 별도로 할 것이지만, 초기 단계에서 아무런 꾸밈 없이 개발하는 것보다는 낫다. 


  #### 3. **WEBSOCKETS로 실시간 채팅 어플 만들기**

  이제부터 WEBSOCKETS로 유사한 실시간 채팅 어플리케이션을 만든다. 익명으로 메시지를 보내고 받을 수 있으며, 사용자가 닉네임을 추가할 수 있도록 할 것이다. 사용자가 채팅방을 만들 수 있으며, 채팅방에 입장 및 퇴장하는 이벤트(예: 'oo님이 입장했습니다')도 추가할 것이다. 마지막으로, 채팅방에 현재 참여 중인 사용자 수를 확인하는 기능도 추가할 것이다.

  실시간 통신을 가능하게 해주는 것은 WebSocket 프로토콜 덕분이다. HTTP 프로토콜의 가장 큰 특징은 stateless이다. 따라서 real-time으로 request, response가 일어나지 않는다. 반면 WebSocket 프로토콜은 statefull 하기 때문에 HTTP와 다르게 지속적인 연결을 제공하며, 클라이언트와 서버 간 여러 데이터를 양방향으로 전송할 수 있다. HTTP는 클라이언트가 서버에 요청을 보내야만 서버에서 응답을 전송할 수 있다. 반면 WebSocket은 서버가 언제든 클라이언트에게 데이터를 푸쉬(push) 할 수 있으므로 실시간 업데이트가 가능하다. 또한 Websocket은 텍스트 기반인 HTTP 프로토콜과 다르게 이진(Binary) 형식으로 데이터를 주고받기 때문에 이미지, 오디오, 비디오 등과 같은 다양한 데이터 유형을 보다 효율적으로 전송할 수 있게 해준다. 

  브라우저가 서버로 WebSocket 요청을 보내면, 서버는 이 요청을 수락하거나 거절한다. 연결이 성립되면, 서버는 클라이언트를 기억하기 때문에 사용자에게 메시지를 보낼 수 있다. 한 번 연결된 후에는 마치 Wi-Fi처럼 계속해서 실시간 연결이 유지된다. 브라우저와 서버 간에는 실시간으로 계속된 연결이 이루어진다. 

  웹 브라우저는 내장된 WebSocket API가 있는데, 다양한 메서드를 통해 서버로 WebSocket 연결을 열고, 메시지를 보내고 받을 수 있으며, 연결 상태를 관리할 수 있다. 
  - `new WebSocket(url[, protocols])`: WebSocket 객체를 생성하고 서버와의 연결을 연다. 
  - `WebSocket.send(data)`: 서버로 메시지를 보낸다.
  - `WebSocket.close([code[, reason]])`: WebSocket 연결을 닫는다.

  Node.js로 WebSocket 