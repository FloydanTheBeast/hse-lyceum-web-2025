const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.write("Welcome to the TCP server!\n");

  socket.on("data", (data) => {
    console.log(`Received: ${data}`);

    socket.write(`You said: ${data}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(8082, () => {
  console.log("Server listening on port 8082");
});

// `nc 127.0.0.1 8082` - для подключения к серверу
