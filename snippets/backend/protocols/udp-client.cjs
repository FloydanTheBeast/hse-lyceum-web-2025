const dgram = require("dgram");

const client = dgram.createSocket("udp4");

const message = Buffer.from("Hello, server!");

client.send(message, 8082, "localhost", (err) => {
  if (err) {
    console.error("Error sending message:", err);
  } else {
    console.log("Message sent to server");
  }
});

client.on("message", (msg, _rinfo) => {
  console.log(`Received response from server: ${msg}`);
  client.close();
});
