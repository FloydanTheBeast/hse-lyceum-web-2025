const dgram = require("dgram");
const readline = require("readline");

const client = dgram.createSocket("udp4");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const SERVER_PORT = 8082;

const sendMessage = (message) =>
  client.send(message, SERVER_PORT, "localhost", (err) => {
    if (err) {
      console.error("Ошибка отправки сообщения");
    }
  });

// Устанавливаем соединение
sendMessage("");

rl.on("line", (message) => {
  if (message.toLowerCase() === "exit") {
    console.log("Завершение работы чата...");
    client.close();
    rl.close();
    return;
  }

  sendMessage(message);
});

client.on("message", (msg, rinfo) => {
  if (rinfo.port !== SERVER_PORT) {
    return;
  }

  console.log(msg.toString());
});
