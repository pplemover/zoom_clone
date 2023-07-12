alert('app.js connection goodtogo');

const socket = new WebSocket(`ws://${window.location.host}`)

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
  socket.send("hello from the browser");
}, 1000);