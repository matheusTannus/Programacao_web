const http = require("http");

const servidor = http.createServer((req, res) => {
  const url = req.url;

  if (!url.startsWith("/usuario/")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      erro: "Rota inválida"
    }));
  }

  const partes = url.split("/");
  const id = Number(partes[2]);

  if (isNaN(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      erro: "ID inválido"
    }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify({
    id: id,
    nome: `Usuário ${id}`
  }));
});

servidor.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
