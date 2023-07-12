const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`)

// Connection Message
socket.addEventListener("open", () => {
  console.log("Connected to Server ✔");
});

socket.addEventListener("message", (message) => {
  console.log("You got this: ", message.data, "from the server at", message.timeStamp,);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ⛔");
});

setTimeout(() => {
  socket.send(JSON.stringify("hello from the browser" ));
}, 1000);

// 화면에 메시지 띄우기
function handleSubmit(event){
  event.preventDefault();
  const input = messageForm.querySelector("input");
  console.log(input.value)
}

messageForm.addEventListener("submit", handleSubmit);