const http = require("http");
const url = require("url");

const HTML_PAGE = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Привет от HTTP-сервера!</h1>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
  console.log("Request Headers:", req.headers);
  console.log("Request Status Code:", req.statusCode);
  console.log("Request Status Message:", req.statusMessage);
  console.log("Requested URL:", req.url);

  res.setHeader("X-Powered-By", "Node.js");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET" && req.url.startsWith("/html")) {
    req.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(HTML_PAGE);
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/json")) {
    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name || "Guest";
    console.log("Query Parameter (name):", name);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: `JSON-привет от HTTP-сервера!` }));
    return;
  }

  if (req.method === "POST" && req.url === "/submit") {
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const bodyString = Buffer.concat(body).toString();
      console.log("Received Body:", bodyString);

      try {
        const parsedBody = JSON.parse(bodyString);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify([parsedBody, parsedBody]));
      } catch (error) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON format" }));
      }
    });

    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
