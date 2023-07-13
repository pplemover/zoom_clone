const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`)

// 서버 연결 성공 메시지
socket.addEventListener("open", () => {
  console.log("Connected to Server ✔");
});

// 서버로부터 직접 받은 메시지 출력 
socket.addEventListener("message", (message) => {
  console.log("You got this: ", message.data, "from the server at", message.timeStamp,);
});

// 서버 연결 종료 메시지
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ⛔");
});

// 서버에 10초 뒤에 메시지 보내기
setTimeout(() => {
  socket.send(JSON.stringify("연결 10초 경과" ));
}, 10000);

// 화면에 메시지 띄우기
function handleSubmit(event){
  event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  const input = messageForm.querySelector("input"); // input 태그를 찾아서,
  socket.send(JSON.stringify(input.value)); // WebSocket을 통해 'value' 값을 서버로 전송
  input.value = ""; // 사용자가 메시지를 전송한 후에 입력 필드를 비움
};

messageForm.addEventListener("submit", handleSubmit);