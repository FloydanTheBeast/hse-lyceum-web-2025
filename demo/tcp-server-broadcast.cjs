const net = require("net");
const clients = [];

const server = net.createServer((socket) => {
  clients.push(socket);

  console.log(
    `New client connected. Current client remote ports: ${clients.map((client) => client.remotePort)}`,
  );

  socket.write(`Hello from server, client ${socket.remotePort}`);

  clients.forEach((client) => {
    if (client !== socket) {
      client.write(`New client connected from port ${client.remotePort}`);
    }
  });

  socket.on("data", (data) => {
    console.log(`Received: ${data}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(8082, () => {
  console.log("Server listening on port 8082");
});
