const dgram = require("dgram");

const server = dgram.createSocket("udp4");

const clients = [];

const isSameClient = (rinfo1, rinfo2) =>
  rinfo1.port === rinfo2.port && rinfo1.address === rinfo2.address;

server.on("message", (msg, rinfo) => {
  console.log(`Получено сообщение от ${rinfo.address}:${rinfo.port}`);

  if (!clients.find((client) => isSameClient(client, rinfo))) {
    clients.push(rinfo);
  }

  const msgString = msg.toString();

  for (const client of clients) {
    if (!isSameClient(client, rinfo) && msgString !== "") {
      server.send(
        `Сообщение от пользователя ${client.port}: ${msgString}`,
        client.port,
        client.address,
      );
    }
  }
});

server.bind(8082, () => {
  console.log("Сервер слушает на порту 8082");
});
