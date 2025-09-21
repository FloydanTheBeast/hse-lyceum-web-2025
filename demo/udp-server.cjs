const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Server received: ${msg} from ${rinfo.address}:${rinfo.port}`);

  const response = `Hello, client! You sent: ${msg}`;

  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error("Error sending response:", err);
    } else {
      console.log("Response sent to client");
    }
  });
});

server.bind(8082, () => {
  console.log("Server is listening on port 8082");
});

// `nc -u 127.0.0.1 8082` - для подключения к серверу
