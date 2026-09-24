const http = require("http");

let contador = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/contador") {
    contador++;

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({ contador }));
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
