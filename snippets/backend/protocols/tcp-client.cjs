const net = require("net");

const client = net.createConnection({ port: 8082 }, () => {
  console.log("Connected to server");
  client.write("Hello Server!");
});

client.on("data", (data) => {
  console.log(`Server says: ${data}`);
});

client.on("end", () => {
  console.log("Disconnected from server");
  process.exit(0);
});

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", process.exit.bind(process, 0));
