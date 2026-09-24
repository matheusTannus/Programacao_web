const http = require("http");

const servidor = http.createServer((req, res) => {
  if (req.url === "/teste") {
    if (req.method === "GET") {
      res.end("Método GET permitido");
    } else {
      res.statusCode = 405;
      res.end("Método não permitido");
    }
  }
});

servidor.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
