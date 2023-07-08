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
  `__dirname`은 현재 실행 중인 스크립트의 디렉토리 경로를 나타내는 Node.js의 내장 변수이다. 즉, 현재 스크립트가 위치한 디렉토리를 기준으로 "src/views" 디렉토리를 지정한다. 위처럼 설정한 뷰 엔진과 뷰 파일 경로는 나중에 라우팅과 함께 사용되어 클라이언트에게 동적인 HTML 페이지를 제공하는 데 활용될 것이다.


  아래 코드는 Express 애플리케이션에서 루트 경로("/")에 대한 GET 요청이 들어올 때 'home'이라는 Pug 템플릿을 렌더링하여 클라이언트에게 응답하는 부분이다. 
  ```JavaScript
  app.get("/", (req, res) => res.render("home"));
  ```
  - app 객체의 get 메서드를 사용하여 루트 경로("/")에 대한 GET 요청 핸드러를 등록합니다. 클라이언트로부터 GET 요청이 들어올 때 핸들러가 실행됩니다.
  - 핸들러 함수는 요청 객체(req)와 응답 객체(res)를 매개변수로 받고, 'home' 탬플릿을 렌더링하여 클라이언트에게 응답합니다. 




