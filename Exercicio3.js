const http = require("http");

const produtos = [
  {
    id: 1,
    nome: "Notebook",
    preco: 2500
  },
  {
    id: 2,
    nome: "Mouse",
    preco: 80
  },
  {
    id: 3,
    nome: "Teclado",
    preco: 150
  }
];

const servidor = http.createServer((req, res) => {
  if (req.url === "/api/produtos") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(produtos));
  }

  if (req.url.startsWith("/api/produtos/")) {
    const partes = req.url.split("/");
    const id = Number(partes[3]);

    const produto = produtos.find((produto) => produto.id === id);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(produto));
  }
});

servidor.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
