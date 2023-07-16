const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`)

function makeMessage(type, payload){
  const msg = {type, payload}; // JSON 객체 msg 생성
  return JSON.stringify(msg); // msg를 문자열로 변환
}

// 서버 연결 성공 메시지
socket.addEventListener("open", () => {
  console.log("Connected to Server ✔");
});

// 서버로부터 직접 받은 메시지 출력 
socket.addEventListener("message", (message) => {
  const li = document.createElement("li"); // 새로운 리스트 아이템 요소를 생성하여 li 변수에 할당 
  li.innerText = message.data; // 메시지의 데이터를 li 요소의 내용으로 설정
  messageList.append(li); // messageList(ul 요소)에 li 요소를 append
});

// 서버 연결 종료 메시지
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ⛔");
});

// 서버에 10초 뒤에 메시지 보내기
// setTimeout(() => {
//   socket.send(JSON.stringify("연결 10초 경과" ));
// }, 10000);

// 사용자가 메시지를 폼에 입력한 뒤 제출할 때 실행되는 함수
function handleSubmit(event){
  event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  const input = messageForm.querySelector("input"); // input 태그를 찾아서,
  socket.send(makeMessage("new_message", input.value)); // WebSocket을 통해 'value' 값을 서버로 전송
  input.value = ""; // 사용자가 메시지를 전송한 후에 입력 필드를 비움
};

// 사용자가 닉네임을 폼에 입력한 뒤 제출할 때 실행되는 함수
function handleNickSubmit(event){
  event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지 
  const input = nickForm.querySelector('input');
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);